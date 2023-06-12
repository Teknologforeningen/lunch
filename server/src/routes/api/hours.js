const express = require('express');
const { Hours } = require('../../models/Hours');
const passport = require('passport');
require('../../passport')(passport);

const router = express.Router();

router.get('/:lang', async (req, res) => {
  try {
    const hours = await Hours.findOne({ where: { language: req.params.lang } });
    return res.send(hours);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

router.post('/:lang', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const updatedHours = req.body.obj.hours;
    const hours = await Hours.findOne({ where: { language: req.params.lang } });
    if (!hours) {
      const newHours = Hours.build({
        hours: updatedHours,
        language: req.params.lang,
      });
      await newHours.save();
      return res.status(200).json({msg: 'New hours added'});
    } else {
      hours.hours = updatedHours;
      await hours.save();
      return res.status(200).json({msg: 'Hours updated'});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

module.exports = router;
