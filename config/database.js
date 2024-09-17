require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
});

const User = require('../models/User')(sequelize);
const Order = require('../models/Order')(sequelize);

User.associate({ Order });
Order.associate({ User });

module.exports = { sequelize, User, Order };
