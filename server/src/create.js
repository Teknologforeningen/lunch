const mongoose = require('mongoose');
const User = require('./models/User');
const genPasswordHash = require('./utils').genPasswordHash;
require('dotenv').config();

mongoose.connect(process.env.DBURL);

mongoose.connection.once('open', () => {
    console.log('Connected to lunch db');
}).on('error', (err) => {
    console.log('Failed to connect to db: ' + err);
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