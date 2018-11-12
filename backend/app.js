const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      Post = require('./models/post');

mongoose.connect('mongodb+srv://john:F233aTrVwkU4QAT@cluster0-8ztdu.mongodb.net/posts?retryWrites=true', {useNewUrlParser: true})
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("trouble connecting to database");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

const posts = [];

app.get("/", function(req, res) {
  res.send("Welcome to server!");
});

app.get("/api/posts", function(req, res) {
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

app.post("/api/posts", function(req, res) {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'new post added'
  });
});

module.exports = app;
