const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;
const { fileUploader } = require("../middlewares/multer");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/showuser", userController.getAll);
router.get("/token", userController.getToken, userController.getUserByToken);
router.get("/verify/:email", userController.verify);

router.patch(
  "/verifyupdate",
  userController.getToken,
  userController.verifyByToken
);
router.get("/forgotpassword/:email", userController.forgotPass);

router.patch(
  "/resetpassword",
  userController.getToken,
  userController.resetPass
);

router.patch(
  "/editProfile/:id",
  fileUploader({
    destinationFolder: "avatar",
  }).single("avatar"),
  userController.editProfile
);

module.exports = router;
