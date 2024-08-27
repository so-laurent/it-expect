const Reservation = require('./Model');
const Restaurant = require('../Restaurants/Model');

/**
 * Get all reservations
 * @param {Object} req
 * @param {Object} res
 */
const getReservations = (req, res) => {
    Reservation.findAll().then(reservations => {
        res.json({ reservations });
    });
};

/**
 * Get a reservation by id
 * @param {Object} req
 * @param {Object} res
 */
const getReservation = (req, res) => {
    Reservation.findByPk(req.params.id, {
        include: [{
            model: Restaurant,
            attributes: ['name', 'address', 'category']
        }],
        group: ['Restaurant.id'],
    }).then(reservation => {
        if (!reservation) {
            return res.status(404).json({ error: "Reservation not found" });
        }
        res.json({ reservation });
    });
};

/**
 * Get all reservations by user
 * @param {Object} req
 * @param {Object} res
 */
const getReservationsByUser = (req, res) => {
    Reservation.findAll({ 
        where: { userId: req.params.userId },
        include: [{
            model: Restaurant,
            attributes: ['name', 'address', 'category']
        }],
        group: [],
    }).then(reservations => {
        res.json({ reservations });
    });
};

/**
 * Get all reservations by restaurant
 * @param {Object} req
 * @param {Object} res
 */
const getReservationsByRestaurant = (req, res) => {
    Reservation.findAll({ where: { restaurantId: req.params.restaurantId } }).then(reservations => {
        res.json({ reservations });
    });
};

/**
 * Create a new reservation
 * @param {Object} req
 * @param {Object} res
 */
const createReservation = (req, res) => {
    const item = {
        UserId: req.user.id,
        RestaurantId: req.body.restaurantId,
        date: req.body.date,
        time: req.body.time,
        people: req.body.people
    };

    // check if the user already has a reservation for the same date and time
    Reservation.findAll({
        where: {
            UserId: item.UserId,
            // date in DD/MM/YYYY format
            date: new Date(item.date).toISOString(),
            // time in HH:MM:SS format 
            time: (item.time + ':00')
        }
    }).then(reservations => {
        if (reservations.length > 0) {
            return res.status(400).json({ error : 'You already have a reservation for this date and time' });
        }

        checkAvailability(item).then(status => {

            if (!status.available) {
                return res.status(400).json({ error: 'Restaurant is not available for this date and time' });
            }
    
            Reservation.build(item).validate().then(() => {
                Reservation.create(item).then(reservation => {
                    return res.json({ reservation });
                });
            }).catch(error => {
                return res.status(400).json({ error: error.errors[0].message });
            });
        });
    });
};

/**
 * Update a reservation
 * @param {Object} req
 * @param {Object} res
 */
const updateReservation = (req, res) => {

    const item = {
        UserId: req.user.id,
        RestaurantId: req.body.restaurantId,
        date: req.body.date,
        time: req.body.time,
        people: req.body.people
    };

    Reservation.findByPk(req.params.id).then(reservation => {
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        if (reservation.UserId !== item.UserId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        reservation.update(item, { fields: Object.keys(item) }).then(updatedReservation => {
            res.json({ reservation: updatedReservation });
        }).catch(error => {
            res.status(400).json({ error: error.errors[0].message });
        });
    });
};

/**
 * Delete a reservation
 * @param {Object} req
 * @param {Object} res
 */
const deleteReservation = (req, res) => {
    Reservation.findByPk(req.params.id).then(reservation => {
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        if (reservation.UserId !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        reservation.destroy().then(() => {
            res.json({ message: "Reservation deleted" });
        });
    });
};

const getAvailability = (req, res) => {

    const slots = ['11:00', '12:00', '13:00', '14:00', '19:00', '20:00', '21:00', '22:00']

    const date = req.body.date;
    const restaurantId = req.params.restaurantId;
    
    Restaurant.findByPk(restaurantId).then(restaurant => {
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        
        const promises = slots.map(slot => {
            return checkAvailability({
                RestaurantId: restaurantId,
                date: date,
                time: slot,
                people: 0
            }).then(status => {
                return {
                    time: slot,
                    available: status.available,
                    totalPeople: status.totalPeople
                };
            });
        });

        Promise.all(promises).then(availableSlots => {
            const availability = {};
            availableSlots.forEach(slot => {
                availability[slot.time] = {
                    available: slot.available,
                    totalPeople: slot.totalPeople
                };
            });

            res.json({ 
                date: date,
                availability: availability
            });
        });
    });
};


//function checking if the restaurant is available for the reservation date and time based on the restaurant capacity
const checkAvailability = (item) => {
    return Restaurant.findByPk(item.RestaurantId).then(restaurant => {
        return Reservation.findAll({
            where: {
                RestaurantId: item.RestaurantId,
                // date in DD/MM/YYYY format
                date: new Date(item.date).toISOString(),
                // time in HH:MM:SS format 
                time: (item.time + ':00')
            }
        }).then(reservations => {
            const totalPeople = reservations.reduce((acc, reservation) => acc + reservation.people, 0);
            return {
                available: (restaurant.capacity - totalPeople) >= item.people,
                totalPeople: totalPeople,
            }
        });
    });
};


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