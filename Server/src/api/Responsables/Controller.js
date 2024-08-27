const services = require("./Service");

const getResponsables = (req, res) => {
    services.getResponsables(req, res);
}

const getResponsablesByUser = (req, res) => {
    services.getResponsablesByUser(req, res);
}

const getResponsablesByRestaurant = (req, res) => {
    services.getResponsablesByRestaurant(req, res);
}

const createResponsable = (req, res) => {
    services.createResponsable(req, res);
}

const updateResponsable = (req, res) => {
    services.updateResponsable(req, res);
}

const deleteResponsable = (req, res) => {
    services.deleteResponsable(req, res);
}

module.exports = {
    getResponsables,
    getResponsablesByUser,
    getResponsablesByRestaurant,
    createResponsable,
    updateResponsable,
    deleteResponsable
};