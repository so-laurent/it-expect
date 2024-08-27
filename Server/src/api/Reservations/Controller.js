const services = require("./Service");

const getReservations = (req, res) => {
    services.getReservations(req, res);
}

const getReservation = (req, res) => {
    services.getReservation(req, res);
}

const getReservationsByUser = (req, res) => {
    services.getReservationsByUser(req, res);
}

const getReservationsByRestaurant = (req, res) => {
    services.getReservationsByRestaurant(req, res);
}

const createReservation = (req, res) => {
    services.createReservation(req, res);
}

const updateReservation = (req, res) => {
    services.updateReservation(req, res);
}

const deleteReservation = (req, res) => {
    services.deleteReservation(req, res);
}

const getAvailability = (req, res) => {
    services.getAvailability(req, res);
}

module.exports = {
    getReservations,
    getReservation,
    getReservationsByUser,
    getReservationsByRestaurant,
    createReservation,
    updateReservation,
    deleteReservation,
    getAvailability
};