// THIS FILE IS BASED OF THE RMIT-FWP LAB 08- login-registration-example

const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op,
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);

// Relate post and user.
db.post.belongsTo(db.user, {
  foreignKey: { postingUser: "email", allowNull: false },
});

//sync the database
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();
};

module.exports = db;
