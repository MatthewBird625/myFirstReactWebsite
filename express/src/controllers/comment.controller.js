const db = require("../database");

// Select all comments for a post from the database.
exports.all = async (req, res) => {
  const comments = await db.comment.findAll({
    where: { postPostId: req.params.id },
  });
  res.json(comments);
};

// Create a comment in mySQL
exports.create = async (req, res) => {
  console.log(req.body.content);
  const post = await db.comment.create({
    text: req.body.content,
    postPostId: req.body.postId,
    userEmail: req.body.userEmail,
  });

  res.json(post);
};
