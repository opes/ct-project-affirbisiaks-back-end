const Sequelize = require('sequelize');
const database = require('../utils/database.js');

const { DataTypes, Model } = Sequelize;

class User extends Model {}

User.init(
  {
    username:  {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: false,
    },
    affirmations: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    preference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },

  {
    sequelize: database, timestamps: false
  }
);

module.exports = User;
