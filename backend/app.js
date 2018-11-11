var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

const posts = [
  {id:"dadji2232314", title:"first post from server", content:"This is coming from the server"},
  {id:"dnwe29184929", title:"second post from server", content:"The second posts"}
];

app.get("/", function(req, res) {
  res.send("Welcome to server!");
});

app.get("/api/posts", function(req, res) {
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});

app.post("/api/posts", function(req, res) {
  // this.posts.push({
  //   id: "dsjsnngijdn223",
  //   title: req.body.post.title,
  //   content: req.body.post.content
  // });
  res.status(201).json({
    message: 'new post added'
  });
});

module.exports = app;
