const { DataTypes, Model } = require('sequelize');
const db = require('../../database');
const config = require('../../config');
const role = config.role;

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: "Email must be a valid email"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM(role.user, role.admin),
        defaultValue: role.user,
        allowNull: false,
        validate: {
            isIn: {
                args: [[role.user, role.admin]],
                msg: "Must be a valid role"
            }
        }
    }
}, {
    sequelize: db.sequelize,
    modelName: 'User'
})

User.sync({ force: false })

module.exports = User;