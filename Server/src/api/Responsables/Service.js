const Responsable = require('./Model');
const Restaurant = require('../Restaurants/Model')
const User = require('../Users/Model');
const Avis = require('../Avis/Model');

const Sequelize = require('sequelize');

const role = require('../../config').role;

/**
 * Get all responsables
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getResponsables = (req, res) => {
    Responsable.findAll().then(responsables => {
        res.json({ responsables });
    });
};

/**
 * Get a responsable by id
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getResponsablesByUser = (req, res) => {
    Responsable.findAll({ 
        where: { UserId: req.params.userId },
        include: [{
            model: Restaurant,
            // get average rating of restaurant from avis
            include: [{
                model: Avis,
                attributes: [
                    [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
                ],
                required: false
            }],
            group: ['Restaurant.id'],
        }],
        group: ['Restaurant.id']
    }).then(responsables => {
        if (!responsables) {
            return res.status(404).json({ error: "Responsable not found" });
        }
        res.json({ responsables });
    });
}

/**
 * Get all responsables by restaurant
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getResponsablesByRestaurant = (req, res) => {
    Responsable.findAll({ 
        where: { restaurantId: req.params.restaurantId },
        include: [{
            model: User,
            attributes: ['username', 'email']
        }]
    }).then(responsables => {
        res.json({ responsables });
    });
}

/**
 * Create a new responsable
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createResponsable = (req, res) => {
    User.findByPk(req.params.userId).then(user => {
        if (user) {
            user.update({
                role: role.admin
            });
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    });
    Responsable.findOne({ where: { UserId: req.params.userId, RestaurantId: req.params.restaurantId } }).then(responsable => {
        if (responsable) {
            return res.status(404).json({ error: "Responsable already exist" });
        } else {
            const item = {
                UserId: req.params.userId,
                RestaurantId: req.params.restaurantId,
                role: req.body.role
            };

            Responsable.build(item).validate().then(() => {
                Responsable.create(item).then(responsable => {
                    res.json({ responsable });
                });
            }).catch(error => {
                res.status(400).json({ error: error.errors[0].message });
            });
        }
    });
}

/**
 * Update a responsable
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateResponsable = (req, res) => {
    const item = {
        UserId: req.params.userId,
        RestaurantId: req.params.restaurantId,
        role: req.body.role
    };

    Responsable.findOne({ where: { UserId: req.params.userId, RestaurantId: req.params.restaurantId } }).then(responsable => {
        if (!responsable) {
            return res.status(404).json({ error: "Responsable not found" });
        }

        responsable.update(item, { fields: Object.keys(item) }).then(updatedResponsable => {
            res.json({ responsable: updatedResponsable });
        }).catch(error => {
            res.status(400).json({ error: error.errors[0].message });
        });
    });
}

/**
 * Delete a responsable
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteResponsable = (req, res) => {
    Responsable.findOne({ where: { userId: req.params.userId, restaurantId: req.params.restaurantId } }).then(responsable => {
        if (!responsable) {
            return res.status(404).json({ error: "Responsable not found" });
        }
        responsable.destroy().then(() => {
            res.json({ message: "Responsable deleted" });
        });
    });
}

module.exports = {
    getResponsables,
    getResponsablesByUser,
    getResponsablesByRestaurant,
    createResponsable,
    updateResponsable,
    deleteResponsable
};