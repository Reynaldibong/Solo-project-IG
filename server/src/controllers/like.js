const db = require("../models");

const LikeController = {
  getAllLike: async (req, res) => {
    try {
      const { user_id } = req.params;
      await db.Likes.findAll({
        where: {
          user_id,
        },
      }).then((result) => res.send(result));
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
  likePost: async (req, res) => {
    try {
      const { user_id } = req.body;
      const { post_id } = req.params;

      const post = await db.Post.findByPk(post_id);
      if (!post) {
        throw new Error("Post doesn't exist");
      }

      const existLike = await db.Likes.findOne({
        where: {
          post_id,
          user_id,
        },
      });
      if (existLike) {
        throw new Error("Liked already");
      }
      const likePost = await db.Likes.create({
        post_id,
        user_id,
        status: "LIKE",
      });

      await post.increment("likes", { by: 1 });

      return res.send(likePost);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  unlinkePost: async (req, res) => {
    try {
      const { post_id } = req.params;
      const { user_id } = req.body;

      const post = await db.Post.findByPk(post_id);

      if (!post) {
        throw new Error("Post doesn't exist");
      }

      const unlikePost = await db.Likes.findOne({
        where: {
          user_id,
          post_id,
        },
      });

      if (!unlikePost) {
        return res.send({
          message: "Unlike status",
        });
      }

      await unlikePost.destroy();

      await post.decrement("likes", { by: 1 });

      return res.send({
        message: "Unlike post",
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports = LikeController;
