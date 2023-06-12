const express = require('express');
const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const { Post } = require('../../models/Post');
const passport = require('passport');
require('../../passport')(passport);

const router = express.Router();

router.get('/:lang', async (req, res) => {
  try {
    const posts = await Post.findAll({ where: { language: req.params.lang } });
    return res.send(posts.filter((post) => post.visible));
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

router.get('/images/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post.image) {
      return res.status(404).send();
    }
    res.contentType(post.contentType);
    return res.send(post.image);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

router.post('/:lang', passport.authenticate('jwt', {session: false}), upload.single('image'), async (req, res) => {
  let newPost = {};
  try {
    if (req.file) {
      const img = fs.readFileSync(req.file.path);
      const encodeImage = img.toString('base64');
      newPost = Post.build({
        title: req.body.title,
        content: req.body.content,
        language: req.body.language,
        contentType: req.file.mimetype,
        image: new Buffer.alloc(req.file.size, encodeImage, 'base64'),
      });
    } else {
      newPost = Post.build({
        title: req.body.title,
        content: req.body.content,
        language: req.body.language,
      });
    }
    await newPost.save();
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

router.put('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const postObj = JSON.parse(req.body.obj);
    const post = Post.findByPk(req.params.id);
    if (post) {
      post.title = postObj.title;
      post.content = postObj.content;
      post.visible = postObj.visible;
      await post.save();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const post = Post.findByPk(req.params.id);
    if (post) {
      await post.destroy();
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
