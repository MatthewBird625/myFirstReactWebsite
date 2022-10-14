const db = require("../database");

// Select all comments for a post from the database.
exports.all = async (req, res) => {
  const reactions = await db.reaction.findAll({
    where: { postPostId: req.params.post_id },
  });
  res.json(reactions);
};

// Create a comment in mySQL
exports.create = async (req, res) => {
  console.log(req.body.content);
  const reaction = await db.reaction.create({
    reaction: req.body.reaction,
    userEmail: req.body.userEmail,
    postPostId: req.body.postId,
  });

  res.json(reaction);
};

exports.delete = async (req, res) => {
  console.log("hello");
  console.log(req.body);
  const reaction = await db.reaction.destroy({
    where: { userEmail: req.body.userEmail, postPostId: req.body.postId },
  });

  res.json(reaction);
};

exports.exist = async (req, res) => {
  const reaction = await db.reaction.findAll({
    where: { postPostId: req.query.postId, userEmail: req.query.userEmail },
  });

  res.json(reaction);
};
// Select all reactions for a post from the database.
exports.all = async (req, res) => {
  const reactions = await db.reaction.findAll({
    where: { postPostId: req.params.id },
  });
  res.json(reactions);
};
