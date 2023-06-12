const express = require('express');
const { Announcement } = require('../../models/Announcement');
const passport = require('passport');
require('../../passport')(passport);

const router = express.Router();

router.get('/:lang', async (req, res) => {
  try {
    const announcement = await Announcement.findOne({ where: { language: req.params.lang } });
    return res.send(announcement);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

router.post('/:lang', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const announcementObj = req.body.obj;
  try {
    const announcement = await Announcement.findOne({ where: { language: req.params.lang } });
    if (!announcement) {
      const newAnnouncement = Announcement.build({
        message: announcementObj.message,
        language: req.params.lang,
      });
      await newAnnouncement.save();
    } else {
      announcement.message = announcementObj.message;
      await announcement.save();
    }
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

module.exports = router;
