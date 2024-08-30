const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'silver-micro', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = { sequelize }