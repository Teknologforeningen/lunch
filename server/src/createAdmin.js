const mongoose = require('mongoose');
const User = require('./models/User');
const genPasswordHash = require('./utils').genPasswordHash;
require('dotenv').config();

const mongoUrl = process.env.MONGODB_USER && process.env.MONGODB_PW ?
  `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@${process.env.DBURL}/${process.env.DBNAME}?authSource=admin` :
  `mongodb://${process.env.DBURL}/${process.env.DBNAME}`;

mongoose.connect(mongoUrl).then(() => {
  console.log('Connected to lunch db');
}).catch((error) => {
  console.log(`Error connceting to db: ${error}`);
});

const saltHash = genPasswordHash(process.env.ADMIN_PW);

User.deleteMany({}, () => console.log('Old users deleted'));
const salt = saltHash.salt;
const hash = saltHash.hash;
const username = process.env.ADMIN_USER;
const newUser = new User({
  username: username,
  hash: hash,
  salt: salt,
});
newUser.save().then(() => {
  console.log(`${username} saved successfully`);
  mongoose.connection.close();
}).catch((error) => {
  console.log(`Could not save user: ${error}`);
});
