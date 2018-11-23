const express = require('express'),
      Post = require('../models/post');
      router = express.Router(),
      multer = require("multer");

const MIME_TYPE_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_TYPE[file.mimetype];
    let err = new Error("Invalid MIME Type");
    if(isValid) {
      err = null;
    }
    cb(err, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_TYPE[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.get("", function(req, res) {
  Post.find((err, response) => {
    if(err) {
      console.log(err);
    } else {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: response
      });
    }
  })
});

router.post("", multer(storage).single("image"),function(req, res) {
  const post = {
    title: req.body.title,
    content: req.body.content
  };
  post.save().then(result => {
    res.status(201).json({
      message: 'new post added',
      id: result._id
    });
  });
});

router.get("/:id", function(req, res) {
  Post.findOne({_id: req.params.id}, function(err, post) {
    if(err) {
      console.log(err);
    } else {
      res.status(200).json({
        message: 'Post fetched successfully',
        post: post
      });
    }
  })
});

router.put("/:id", function(req, res) {
  let post = {_id: req.body.id, title: req.body.title, content: req.body.content};
  Post.findOneAndUpdate({_id: post._id}, post)
    .then((err) => {
      if(err) {
        console.log(err);
      }
    });
  res.status(200).json({
    message: 'Posts deleted successfully'
  });
});

router.delete("/:id", function(req, res) {
  Post.findOneAndUpdate({_id: req.params.id}, (err, res) => {
    if(err) {
      console.log(err);
    }
  })
  res.status(200).json({
    message: 'post deleted'
  });
});

module.exports = router;
