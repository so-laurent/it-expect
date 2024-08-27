const express = require("express");
const avisController = require("./Controller");

const authMiddleware = require("../../middlewares/authMiddleware");
const adminMiddleware = require("../../middlewares/adminMiddleware");

const avisRouter = express.Router();

avisRouter.get("/", avisController.getAllAvis);
avisRouter.get("/:id", avisController.getAvisById);
avisRouter.get("/user/:userId", avisController.getAvisByUser);
avisRouter.get("/restaurant/:restaurantId", avisController.getAvisByRestaurant);
avisRouter.post("/", authMiddleware(), avisController.createAvis);
avisRouter.put("/:id", authMiddleware(), avisController.updateAvis);
avisRouter.delete("/:id", authMiddleware(), avisController.deleteAvis);

module.exports = avisRouter;
