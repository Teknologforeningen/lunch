const mongoose = require('mongoose');
const User = require('./models/User');
const genPasswordHash = require('./utils').genPasswordHash;
require('dotenv').config({ path: '../.env' });

const mongoUrl = process.env.MONGODB_USER && process.env.MONGODB_PW
    ? `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@${process.env.DBURL}/${process.env.DBNAME}?authSource=admin`
    : `mongodb://${process.env.DBURL}/${process.env.DBNAME}`;

mongoose.connect(mongoUrl).then(() => {
    console.log('Connected to lunch db');
}).catch((error) => {
    console.log(`Error connceting to db: ${error}`)
});

const saltHash = genPasswordHash(process.env.ADMIN_PW);

const salt = saltHash.salt;
const hash = saltHash.hash;

User.findOne({ 'username': process.env.ADMIN_USER }, (err, user) => {
    if (err) {
        return res.status(500).json({
            title: 'server error',
            error: err
        });
    } else if (!user) {
        const newUser = new User({
            username: process.env.ADMIN_USER,
            hash: hash,
            salt: salt
        });
        newUser.save(err => {
            if (err) {
                console.log('Could not save user');
            } else {
                console.log('User saved successfully');
            }
        });
        
    } else {
        console.log('NOP');
    }
});