const services = require("./Service");

const avisController = {

    getAllAvis: async (req, res) => {
        services.getAllAvis(req, res);
    },

    getAvisById: async (req, res) => {
        services.getAvisById(req, res);
    },

    getAvisByUser: async (req, res) => {
        services.getAvisByUser(req, res);
    },

    getAvisByRestaurant: async (req, res) => {
        services.getAvisByRestaurant(req, res);
    },
    
    createAvis: async (req, res) => {
        services.createAvis(req, res);
    },

    updateAvis: async (req, res) => {
        services.updateAvis(req, res);
    },

    deleteAvis: async (req, res) => {
        services.deleteAvis(req, res);
    }

};

module.exports = avisController;
