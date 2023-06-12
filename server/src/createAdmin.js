const { Sequelize } = require('sequelize');
const { User } = require('./models/User');
const genPasswordHash = require('./utils').genPasswordHash;
const setupDatabase = require('./models');
require('dotenv').config();

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

const saltHash = genPasswordHash('password');

const salt = saltHash.salt;
const hash = saltHash.hash;
const username = 'admin';

const newUser = User.build({
  username: username,
  hash: hash,
  salt: salt,
});

newUser.save().then(() => {
  console.log(`${username} saved successfully`);
}).catch((error) => {
  console.log(`Could not save user: ${error}`);
}).finally(() => {
  sequelize.close();
});



