const db = require("../models");

const commentController = {
  addComment: async (req, res) => {
    try {
      const { user_id, comment } = req.body;
      const { post_id } = req.params;

      const addComment = await db.Comment.create({
        comment,
        user_id,
        post_id,
      });
      return res.status(200).send({
        data: addComment,
        message: "Comment Added!",
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
  getComment: async (req, res) => {
    try {
      //   const { id } = req.params;
      await db.Comment.findAll({
        include: [
          {
            model: db.User,
            attributes: ["username", "fullname", "avatar_url"],
          },
        ],
        where: {
          post_id: req.params.id,
        },
      }).then((data) => res.status(200).send(data));
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
};

module.exports = commentController;
