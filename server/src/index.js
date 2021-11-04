// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const issueJWT = require('./utils').issueJWT;
const validPassword = require('./utils').validPassword;

require('dotenv').config();
require('./passport')(passport);

// Models
const User = require('./models/User');

if(process.env.MONGODB_USER && process.env.MONGODB_PW) {
    mongoose.connect("mongodb://" + process.env.MONGODB_USER + ":" + process.env.MONGODB_PW + "@" + process.env.DBURL);
    mongoose.connection.useDb(process.env.DBNAME);
} else {
    mongoose.connect("mongodb://" + process.env.DBURL + "/" + process.env.DBNAME);
}

mongoose.connection.once('open', () => {
    console.log('Connected to lunch db');
}).on('error', (err) => {
    console.log('Failed to connect to db: ' + err);
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        User.findOne({ username: username }, (err, user) => {
            if (user) {
                const isValid = validPassword(password, user.hash, user.salt);
                if (isValid) {
                    const jwt = issueJWT(user);
                    return res.status(200).json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires });
                } else {
                    return res.status(401).json({ success: false, msg: "Wrong Credentials" });
                }
            } else {
                return res.status(401).json(err);
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(401).json(error);
    }
});

const posts = require('./routes/api/posts');
const hours = require('./routes/api/hours');
const prices = require('./routes/api/prices');
const messages = require('./routes/api/messages');
const menu = require('./routes/api/menu');
const announcemetns = require('./routes/api/annoucements');

app.use('/api/posts', posts);
app.use('/api/hours', hours);
app.use('/api/prices', prices);
app.use('/api/messages', messages);
app.use('/api/menu', menu);
app.use('/api/announcements', announcemetns);

const path = require('path');

app.use(express.static(path.resolve(__dirname, '../../client/build')));
app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html')); 
});

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log('Server running on port ' +  port);
});
