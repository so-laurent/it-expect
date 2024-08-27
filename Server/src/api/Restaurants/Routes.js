const express = require("express");
const config = require("../../config");
const restaurantController = require("./Controller")

const authMiddleware = require("../../middlewares/authMiddleware");
const adminMiddleware = require("../../middlewares/adminMiddleware");

const restaurantRouter = express.Router();

restaurantRouter.get("/" , restaurantController.getRestaurants);
restaurantRouter.get("/search" , restaurantController.searchRestaurants);
restaurantRouter.get("/:restaurantId" , restaurantController.getRestaurant);
restaurantRouter.post("/" , authMiddleware(), restaurantController.createRestaurant);
restaurantRouter.put("/:restaurantId" , authMiddleware(), adminMiddleware(config.adminRole.patron), restaurantController.updateRestaurant);
restaurantRouter.delete("/:restaurantId" , authMiddleware(), adminMiddleware(config.adminRole.patron), restaurantController.deleteRestaurant);

module.exports = restaurantRouter;