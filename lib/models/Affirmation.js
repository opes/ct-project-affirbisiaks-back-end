const Sequelize = require('sequelize');
const database = require('../utils/database.js');

const { DataTypes, Model } = Sequelize;

class Affirmation extends Model {}

Affirmation.init(
  {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },

  {
    sequelize: database,
    timestamps: false,
  }
);

module.exports = Affirmation;
