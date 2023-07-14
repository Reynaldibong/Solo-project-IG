const express = require("express");
const router = express.Router();
const commentController = require("../controllers").commentController;

router.post("/:post_id", commentController.addComment);
router.get("/:id", commentController.getComment);

module.exports = router;
