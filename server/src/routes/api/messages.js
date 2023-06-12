const express = require('express');
const { Message } = require('../../models/Message');
const passport = require('passport');
require('../../passport')(passport);

const router = express.Router();

router.get('/:lang', async (req, res) => {
  try {
    const message = await Message.findOne({ where: { language: req.params.lang } });
    return res.send(message);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

router.post('/:lang', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const msgObj = req.body.obj;
  try {
    const message = await Message.findOne({ where: { language: req.params.lang } });
    if (!message) {
      const newMessage = Message.build({
        message: msgObj.message,
        language: req.params.lang,
      });
      await newMessage.save();
    } else {
      message.message = msgObj.message;
      await message.save();
    }
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

module.exports = router;
