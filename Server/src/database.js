const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'silver-micro', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = { sequelize }