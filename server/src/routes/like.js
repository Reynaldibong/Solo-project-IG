const express = require("express");
const router = express.Router();
const LikeController = require("../controllers").LikeController;

router.post("/:post_id", LikeController.likePost);
router.delete("/:post_id", LikeController.unlinkePost);
router.get("/:user_id", LikeController.getAllLike);

module.exports = router;
