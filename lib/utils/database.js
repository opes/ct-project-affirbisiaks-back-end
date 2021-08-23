require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: false,
    connectionString: process.env.DATABASE_URL,
  },
});

module.exports = sequelize;
