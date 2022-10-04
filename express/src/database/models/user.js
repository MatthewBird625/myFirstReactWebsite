// THIS FILE IS BASED OF THE RMIT-FWP LAB 08- login-registration-example

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING(32),
        primaryKey: true,
      },
      password_hash: {
        type: DataTypes.STRING(96),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
    },
    {
      // I want to have the created at timestamp to show when the user account was created on the profile page
      timestamps: true,
    }
  );
