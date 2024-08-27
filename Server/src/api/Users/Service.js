const User = require("./Model")
const config = require("../../config")
const auth = require("../services/auth")
const hash = require('hash.js');

/**
 * Register a new user
 * @param {Object} req - request object
 * @param {Object} res - response object
*/
const register = (req, res) => {
    
    let email = req.body.email;
    let username = req.body.username;
    // hash the password
    let password = req.body.password;
    password = hash.sha256().update(password).digest('hex');

    if (!(email && username && password)) {
        res.json({  message: "Register failed - Invalid input",
                    success: false });
        return false;
    };

    User.findOne({ where: { email: email } }).then(user => {
        if (user) {
            res.json({  message: "Register failed - User already exist",
                        success: false });
        } else {
            const item = {
                username: username,
                password: password,
                email: email,
                role: config.role.user
            };

            User.build(item).validate().then(() => {
                User.create(item).then(user => {
                    res.json({  message: "Registered Succesfully",
                                success: true });
                });
            }).catch(error => {
                res.status(400).json({ error: error.errors[0].message });
            });
        }
    });
}

/**
 * Authenticate a user
 * @param {Object} req - request object
 * @param {Object} res - response object
*/
const authentication = (req, res) => {

    let email = req.body.email;
    let password = req.body.password;
    password = hash.sha256().update(password).digest('hex');

    if (!(email && password)) { 
        res.json({  message: "Login Failed - Invalid input",
                    success: false });
        return false;
    };

    User.findOne({ where: { email: email } }).then(user => {
        if (!user) {
            res.json({  message: "Login Failed - User Not Found",
                        success: false });
            return false;
        }
        if (user.password !== password) {
            res.json({  message: "Login Failed - Password Incorrect",
                        success: false });
            return false;
        }
        else {
            res.json({  message: "Logged in Successfully",
                        success: true,
                        user: {
                            id: user.id,
                            role: user.role,
                            username: user.username,
                            email: user.email,
                            createdAt: user.createdAt,
                            updatedAt: user.updatedAt
                        },
                        token: auth.generateToken(user)
                    });
            return true;
        }
    });
}

const getUser = (req, res) => {
    User.findByPk(req.params.id,
        { attributes: { exclude: ['password'] } }).then(user => {
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ user });
    });
}

const getUsers = (req, res) => {
    User.findAll(
        { attributes: { exclude: ['password'] } }).then(users => {
        res.json({ users });
    });
}

const updateUser = (req, res) => {
    const item = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    User.findByPk(req.params.id).then(user => {
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.update(item).then(user => {
            res.json({ user : {
                id: user.id,
                role: user.role,
                username: user.username,
                email: user.email} 
            });
        }).catch(error => {
            res.status(400).json({ error: error.errors[0].message });
        });
    });
}

const deleteUser = (req, res) => {
    User.findByPk(req.params.id).then(user => {
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.destroy();
        res.json({ message: "User deleted" });
    });
}

module.exports = { 
    register, 
    authentication,
    getUser,
    getUsers,
    updateUser,
    deleteUser
}