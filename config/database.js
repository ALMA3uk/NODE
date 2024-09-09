require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node', 'root', 'root', {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false
});

const User = require('../models/User')(sequelize);
const Order = require('../models/Order')(sequelize);

User.associate({ Order });
Order.associate({ User });

module.exports = { sequelize, User, Order };
