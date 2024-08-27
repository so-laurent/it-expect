const express = require("express");
const userController = require("./Controller")

const authMiddleware = require("../../middlewares/authMiddleware");

const userRouter = express.Router();
userRouter.get("/", authMiddleware(), userController.getUsers);
userRouter.get("/:id", authMiddleware(), userController.getUser);
userRouter.put("/:id", authMiddleware(), userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);
userRouter.post("/auth", userController.authenticate);
userRouter.post("/register", userController.register);

module.exports = userRouter;