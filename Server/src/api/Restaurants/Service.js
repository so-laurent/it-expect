const Restaurant = require('./Model');
const Responsable = require('../Responsables/Model');
const User = require('../Users/Model');
const Avis = require('../Avis/Model');

const validator = require('validator');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const adminRole = require('../../config').adminRole;
const role = require('../../config').role;

/**
 * Get all restaurants
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getRestaurants = (req, res) => {
    Restaurant.findAll(
        // get average rating of restaurant from avis
        {
            include: [{
                model: Avis,
                attributes: [],
                required: false
            }],
            attributes: {
                include: [
                    [Sequelize.fn('AVG', Sequelize.col('avis.rating')), 'averageRating'],
                    [Sequelize.fn('COUNT', Sequelize.col('avis.id')), 'nbAvis']
                ]
            },
            group: ['Restaurant.id']
        }
            
    ).then(restaurants => {
        res.json({ restaurants });
    });
};

/**
 * Get a restaurant by id
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getRestaurant = (req, res) => {

    if (isNaN(req.params.restaurantId)) {
        return res.status(400).json({ error: "Invalid restaurant id" });
    }

    Restaurant.findByPk(req.params.restaurantId, {
        // get average rating of restaurant from avis
        include: [{
            model: Avis,
            attributes: [],
            required: false
        }],
        attributes: {
            include: [
                [Sequelize.fn('AVG', Sequelize.col('avis.rating')), 'averageRating'],
                [Sequelize.fn('COUNT', Sequelize.col('avis.id')), 'nbAvis']
            ]
        }
    }).then(restaurant => {
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }
        res.json({ restaurant });
    });
};

/**
 * Search restaurants by name
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Restaurants found
*/
const searchRestaurants = (req, res) => {

    if (!req.query.name && !req.query.category) {
        return res.status(400).json({ error: 'At least one of name or category must be provided' });
    }
    let whereClause = {};

    if (req.query.category) {
        const sanitizedCategory = validator.escape(req.query.category);
        whereClause.category = {
            [Op.like]: `%${sanitizedCategory}%`
        };
    }

    if (req.query.name) {
        const sanitizedInput = validator.escape(req.query.name);
        whereClause.name = {
            [Op.like]: `%${sanitizedInput}%`
        };
    }

    Restaurant.findAll({
        where: whereClause,
        include: [{
            model: Avis,
            attributes: [],
            required: false
        }],
        attributes: {
            include: [
                [Sequelize.fn('AVG', Sequelize.col('avis.rating')), 'averageRating'],
                [Sequelize.fn('COUNT', Sequelize.col('avis.id')), 'nbAvis']
            ]
        },
        group: ['Restaurant.id']
    }).then(restaurants => {
        res.json({ restaurants });
    });
}   


/**
 * Create a new restaurant
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const createRestaurant = (req, res) => {

    const item = {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        description: req.body.description,
        capacity: req.body.capacity,
        category: req.body.category
    };

    Restaurant.build(item).validate().then(() => {
        Restaurant.create(item).then(restaurant => {
            Responsable.create({
                UserId: req.user.id,
                RestaurantId: restaurant.id,
                role: adminRole.patron
            });

            User.findByPk(req.user.id).then(user => {
                user.update({
                    role: role.admin
                });
            });

            res.json({ restaurant });
        });
    }).catch(error => {
        res.status(400).json({ error: error.message });
    });
}

/**
 * Update a restaurant
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const updateRestaurant = (req, res) => {

    const item = {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        description: req.body.description,
        capacity: req.body.capacity,
        category: req.body.category
    };

    if (isNaN(req.params.restaurantId)) {
        return res.status(400).json({ error: "Invalid restaurant id" });
    }

    Restaurant.findByPk(req.params.restaurantId).then(restaurant => {
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }
        restaurant.update(item, {fields: Object.keys(item)}).then(restaurant => {
            res.json({ restaurant });
        }).catch(error => {
            res.status(400).json({ error: error.message });
        });
    });
}

/**
 * Delete a restaurant
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const deleteRestaurant = (req, res) => {

    if (isNaN(req.params.restaurantId)) {
        return res.status(400).json({ error: "Invalid restaurant id" });
    }

    Restaurant.findByPk(req.params.restaurantId).then(restaurant => {
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }
        restaurant.destroy().then(() => {
            res.json({ message: "Restaurant deleted" });
        });
    });
}

module.exports = {
    getRestaurants,
    getRestaurant,
    searchRestaurants,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
};