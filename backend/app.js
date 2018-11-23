const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      postRouter = require('./routes/posts');

mongoose.connect('mongodb+srv://john:F233aTrVwkU4QAT@cluster0-8ztdu.mongodb.net/posts?retryWrites=true', {useNewUrlParser: true})
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("trouble connecting to database");
  });

mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/posts', postRouter);

app.get("/", function(req, res) {
  res.send("Welcome to server!");
});

module.exports = app;
