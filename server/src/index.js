// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const passport = require('passport');
const setupDatabase = require('./models');

require('dotenv').config();
require('./passport')(passport);

setupDatabase();

const app = express();

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/hours', require('./routes/api/hours'));
app.use('/api/prices', require('./routes/api/prices'));
app.use('/api/messages', require('./routes/api/messages'));
app.use('/api/menu', require('./routes/api/menu'));
app.use('/api/announcements', require('./routes/api/annoucements'));
app.use('/api/login', require('./routes/api/login'));

const path = require('path');

app.use(express.static(path.resolve(__dirname, '../../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log('Server running on port ' + port);
});
