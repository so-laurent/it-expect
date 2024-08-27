const { DataTypes, Model } = require('sequelize');
const db = require('../../database');

const categories = process.env.CATEGORIES.split(',');

class Restaurant extends Model { }

Restaurant.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category: {
        type: DataTypes.ENUM,
        values: categories,
        allowNull: false,
        validate: {
            isIn: {
                args: [categories],
                msg: `Category must be one of: ${categories.join(', ')}`
            }
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: {
                args: true,
                msg: "Email must be a valid email"
            }
        }
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: 1,
                msg: "Capacity must be at least 1"
            }
        }
    },
}, {
    sequelize: db.sequelize,
    modelName: 'Restaurant',
})

Restaurant.sync({ force: false })

module.exports = Restaurant;