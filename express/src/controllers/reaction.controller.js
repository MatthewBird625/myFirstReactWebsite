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
  const reaction = await db.reaction.create({
    reaction: req.body.reaction,
    userEmail: req.body.userEmail,
    postPostId: req.body.postId,
  });

  res.json(reaction);
};

exports.delete = async (req, res) => {
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

//deletes all reactions of a post removing them as a constraint preventing post delete
exports.deleteAll = async (req, res) => {
  const reactions = await db.reaction.destroy({
    where: { postPostId: req.body.id },
  });

  res.json(reactions);
};

//deletes all reactions of a post removing them as a constraint preventing post delete
exports.deleteUser = async (req, res) => {
  const reactions = await db.reaction.destroy({
    where: { userEmail: req.body.email },
  });

  res.json(reactions);
};
