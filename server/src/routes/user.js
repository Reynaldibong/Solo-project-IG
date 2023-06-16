const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/showuser", userController.getAll);
router.get("/token", userController.getToken, userController.getUserByToken);

module.exports = router;
