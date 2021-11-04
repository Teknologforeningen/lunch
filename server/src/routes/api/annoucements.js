const express = require('express');
const Announcement = require('../../models/Announcement');
const passport = require("passport");
require('../../passport')(passport);

const router = express.Router();

router.get('/:lang', (req, res) => {
    Announcement.findOne({ 'language': req.params.lang }, (err, message) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else {
            res.send(message);
        }
    });
});

router.post('/:lang', passport.authenticate('jwt', {session: false}), (req, res) => {
    const msgObj = req.body.obj;
    Announcement.findOne({ 'language': req.params.lang }, (err, message) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else if (!message) {
            const newMessage = new Announcement({
                message: msgObj.message,
                language: req.params.lang
            });
            newMessage.save();
        }
        else {
            message.message = msgObj.message;
            message.save();
        }
    });
});

module.exports = router;