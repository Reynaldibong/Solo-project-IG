const express = require("express");
const router = express.Router();
const postController = require("../controllers").postController;
const { fileUploader } = require("../middlewares/multer");

router.post(
  "/createpost/:id",
  fileUploader({
    destinationFolder: "post",
  }).single("post"),
  postController.createPost
);

router.get("/", postController.getAllContent);
router.get("/postby/:id", postController.getPostById);
router.get("/:id", postController.getAllPostByUserId);
router.delete("/:id", postController.deleteContent);
router.patch("/:id", postController.editContent);

module.exports = router;
