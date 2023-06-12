const express = require('express');
const { User } = require('../../models/User');
const issueJWT = require('../../utils').issueJWT;
const validPassword = require('../../utils').validPassword;

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username: username } });
    if (user && validPassword(password, user.hash, user.salt)) {
      const jwt = issueJWT(user);
      return res.status(200).json({
        success: true, user: user, token: jwt.token, expiresIn: jwt.expires
      });
    } else {
      return res.status(401).json({success: false, msg: 'Wrong Credentials'});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send();  
  }
});

module.exports = router;