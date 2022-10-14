module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "reaction",
    {
      reaction_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      reaction: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
