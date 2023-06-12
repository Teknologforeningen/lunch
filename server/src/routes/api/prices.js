const express = require('express');
const { Price } = require('../../models/Price');
const passport = require('passport');
require('../../passport')(passport);

const router = express.Router();

router.get('/:lang', async (req, res) => {
  try {
    const prices = await Price.findAll({ where: { language: req.params.lang } });
    return res.send(prices);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const priceObj = req.body.obj;
    const price = await Price.findByPk(req.params.id);
    if (price) {
      price.description = priceObj.description;
      price.priceStudent = priceObj.priceStudent;
      price.priceNormal = priceObj.priceNormal;
      price.language = priceObj.language;
      await price.save();
    } else {
      const newPrice = new Price({
        description: price.description,
        priceStudent: price.priceStudent,
        priceNormal: price.priceNormal,
        language: price.language,
      });
      await newPrice.save();
    }
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const price = Price.findByPk(req.params.id);
    if (price) {
      await price.destroy();
      res.status(204).send();
    } else {
      res.status(404).send();
    }    
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

module.exports = router;
