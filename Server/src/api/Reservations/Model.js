const { DataTypes, Model } = require('sequelize');
const db = require('../../database');

const Restaurant =  require('../Restaurants/Model');
const User = require('../Users/Model');

class Reservation extends Model {}

Reservation.init({
    
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: {
                args: true,
                msg: "Date must be a valid date"
            },
            isAfter: {
                args: new Date().toISOString().split('T')[0],
                msg: "Date must be after current date"
            }
        }
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            is: {
                args: /^([0-1]?\d|2[0-3]):[0-5]\d$/,
                msg: "Time must be a valid time"
            }
        }
    },
    people: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: 1,
                msg: "Party size must be at least 1"
            }
        }
    }
}, {
    sequelize: db.sequelize,
    modelName: 'Reservation',
})

Reservation.belongsTo(User, { onDelete: 'cascade' });
Reservation.belongsTo(Restaurant, { onDelete: 'cascade' });

User.hasMany(Reservation, { onDelete: 'cascade' });
Restaurant.hasMany(Reservation, { onDelete: 'cascade' });

Reservation.sync({ force: false })

module.exports = Reservation;