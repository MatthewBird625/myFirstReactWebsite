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
  const comment = await db.comment.create({
    text: req.body.content,
    postPostId: req.body.postId,
    userEmail: req.body.userEmail,
  });

  res.json(comment);
};
//deletes all comments of a post removing them as a constraint preventing post delete
exports.deleteAll = async (req, res) => {
  const comments = await db.comment.destroy({
    where: { postPostId: req.body.id },
  });

  res.json(comments);
};

//deletes all comments of a user removing them as a constraint preventing user delete
exports.deleteUser = async (req, res) => {
  const comments = await db.comment.destroy({
    where: { userEmail: req.body.email },
  });

  res.json(comments);
};
