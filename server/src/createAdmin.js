const { Sequelize } = require('sequelize');
const { User } = require('./models/User');
const genPasswordHash = require('./utils').genPasswordHash;
const setupDatabase = require('./models');
require('dotenv').config();

const findOrCreateAdmin = async () => {
  try {
    const username = process.env.ADMIN_USER;
    if (await User.findOne({ where: { username: username } })) {
      console.log(`User with username: ${username} already exists, not creating`);
      return;
    }
    const saltHash = genPasswordHash(process.env.ADMIN_PW);
    const newUser = User.build({
      username: username,
      hash: saltHash.hash,
      salt: saltHash.salt,
    });
    await newUser.save();
    console.log(`User: ${username} created successfully`);  
  } catch(error) {
    console.log(`Could not save user: ${error}`);
  } finally {
    sequelize.close();
  }
};

if (!process.env.ADMIN_USER || !process.env.ADMIN_PW) {
  return;
}


setupDatabase();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'lunch', 
  process.env.DB_USER || 'lunch', 
  process.env.DB_PW || 'lunch', 
  {
    host: process.env.DBURL || 'localhost',
    dialect: 'postgres'
  }
);
  
sequelize.authenticate().then(() => {
  console.log('Connected to lunch db');
}).catch((error) => {
  console.log(`Error connceting to db: ${error}`);
});

findOrCreateAdmin();