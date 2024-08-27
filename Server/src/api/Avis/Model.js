const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../database');

const Restaurant = require("../Restaurants/Model")
const User = require("../Users/Model")

class Avis extends Sequelize.Model { }

Avis.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isIn : {
                args: [[ 0, 1, 2, 3, 4, 5]],
                msg: "Rating must be between 0 and 5"
            }
        }
    },
    review: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize: db.sequelize,
    modelName: 'Avis',
})

Avis.belongsTo(Restaurant, {onDelete: 'cascade'})
Avis.belongsTo(User, {onDelete: 'cascade'})

User.hasMany(Avis, {onDelete: 'cascade' })
Restaurant.hasMany(Avis, {onDelete: 'cascade' })

Avis.sync({ force: false });

module.exports = Avis;
