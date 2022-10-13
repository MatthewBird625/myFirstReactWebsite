// THIS FILE IS BASED OF THE RMIT-FWP LAB 08- login-registration-example

const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const posts = await db.post.findAll();
  res.json(posts);
};

// Create a post in mySQL
exports.create = async (req, res) => {
  console.log(req.body.content);
  const post = await db.post.create({
    text: req.body.content,
    userEmail: req.body.email,
  });

  res.json(post);
};