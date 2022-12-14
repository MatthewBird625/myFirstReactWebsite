// THIS FILE IS BASED OF THE RMIT-FWP LAB 08- login-registration-example

const db = require("../database");
const argon2 = require("argon2");
const { user } = require("../database");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.email);

  if (
    user === null ||
    (await argon2.verify(user.password_hash, req.query.password)) === false
  )
    // Login failed.
    res.json(null);
  else res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

  const user = await db.user.create({
    email: req.body.email,
    password_hash: hash,
    name: req.body.name,
  });

  res.json(user);
};

// update a user in the database.
exports.update = async (req, res) => {
  const user = await db.user.update(
    {
      // email: req.body.email,
      name: req.body.name,
      email: req.body.email,
    },
    {
      where: { email: req.body.oldEmail },
    }
  );

  res.json(user);
};
// delete a user in the database.
exports.delete = async (req, res) => {
  const user = await db.user.destroy({
    where: { email: req.body.email },
  });

  res.json(user);
};

// update a user password in the database.
exports.password = async (req, res) => {
  const userPassCheck = await db.user.findByPk(req.body.userEmail);
  //checks if the old password matches the has in the database- returns false if check fails
  const check = await argon2.verify(userPassCheck.password_hash, req.body.old);
  if (!check) res.send(200, { result: false });

  if (check) {
    const hashNew = await argon2.hash(req.body.new, {
      type: argon2.argon2id,
    });

    const user = await db.user.update(
      {
        password_hash: hashNew,
      },
      {
        where: { email: req.body.userEmail },
      }
    );

    res.json(user);
  }
};
