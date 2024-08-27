const services = require("./Service");
const tools = require("../services/tools");

const authenticate = (req, res) => {
    services.authentication(req, res)
};

const register = (req, res) => {
    services.register(req, res);
};

const getUser = (req, res) => {
    services.getUser(req, res);
};

const getUsers = (req, res) => {
    services.getUsers(req, res);
};

const updateUser = (req, res) => {
    services.updateUser(req, res);
};

const deleteUser = (req, res) => {
    services.deleteUser(req, res);
};

module.exports = {
    authenticate,
    register,
    getUser,
    getUsers,
    updateUser,
    deleteUser
};