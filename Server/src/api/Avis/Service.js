const Avis = require('./Model');
const User = require('../Users/Model');
const Restaurant = require('../Restaurants/Model');

const AvisService = {

  // obtenir l'avis par Utilisateur
  getAvisById: async (req, res) => {
    Avis.findByPk(req.params.id).then(avis => {
      if (!avis) {
        return res.status(404).json({ error: "Review not found" });
      }
      res.json({ avis });
    });
  },

  getAvisByUser: async (req, res) => {

    User.findByPk(req.params.userId).then(user => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
    });

    Avis.findAll({ where: { userId: req.params.userId } }).then(avis => {
      res.json({ avis });
    });
  },

  getAvisByRestaurant: async (req, res) => {

    Restaurant.findByPk(req.params.restaurantId, {}).then(restaurant => {
      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }
    });

    Avis.findAll({ 
      where: { restaurantId: req.params.restaurantId },
      include: [
        { model: User, 
          attributes: ['username'] }
      ],
      group: []
    }).then(avis => {
      res.json({ avis });
    });
  },

  // obtenir tous les avis
  getAllAvis: async (req, res) => {
    Avis.findAll({
      include: [
        { model: User, 
          attributes: ['username'] }
      ],
      group: []
    }).then(avis => {
      res.json({ avis });
    });
  },

  createAvis: async (req, res) => {

    const item = {
      UserId: req.user.id,
      RestaurantId: req.body.restaurantId,
      rating: req.body.rating,
      review: req.body.review
    };

    console.log(item);

    Avis.findAll({ where: { 
      UserId: item.UserId, 
      RestaurantId: item.RestaurantId } }).then(avis => {
      if (avis.length > 0) {
        return res.status(400).json({ error: "Review already exist" });
      }

      Avis.build(item).validate().then(() => {
        Avis.create(item).then(avis => {
          res.json({ avis });
        })
      }).catch(error => {
        res.status(400).json({ error: error.message });
      });
    });
  },

  // MAJ un avis
  updateAvis: async (req, res) => {
    const item = {
      rating: req.body.rating,
      review: req.body.review
    };

    Avis.findByPk(req.params.id).then(avis => {
      if (!avis) {
        return res.status(404).json({ error: "Review not found" });
      }

      if (req.user.id !== avis.UserId) {
        return res.status(403).json({ error: "You are not allowed to update this review" });
      }

      avis.update(item, {fields: Object.keys(item)}).then(avis => {
        res.json({ avis });
      }).catch(error => {
        res.status(400).json({ error: error.message });
      });
    });
  },

  // Supprimer un Avis
  deleteAvis: async (req, res) => {
    Avis.findByPk(req.params.id).then(avis => {
      if (!avis) {
        return res.status(404).json({ error: "Review not found" });
      }

      if (req.user.id !== avis.UserId) {
        return res.status(403).json({ error: "You are not allowed to delete this review" });
      }
      
      avis.destroy().then(() => {
        res.json({ message: "Review deleted" });
      });
    });
  }

};

module.exports = AvisService;
