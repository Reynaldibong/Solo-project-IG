const db = require("../models");
const moment = require("moment");
const post_url = process.env.post_url;

const postController = {
  createPost: async (req, res) => {
    try {
      const { caption } = req.body;
      const { filename } = req.file;

      const post = await db.Post.create({
        caption,
        date: moment().format("LLLL"),
        image: post_url + filename,
        user_id: req.params.id,
      });
      return res.send({
        data: post,
        message: "Upload Success!",
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
        message: "",
      });
    }
  },
  getAllContent: async (req, res) => {
    try {
      const content = await db.Post.findAll({
        include: [
          {
            model: db.User,
            attributes: ["username", "fullname", "avatar_url"],
          },
        ],
      });
      return res.status(200).send({
        content,
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  getPostById: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await db.Post.findOne({
        where: {
          id,
        },
      });

      return res.status(200).send({
        post,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  getAllPostByUserId: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await db.Post.findAll({
        where: {
          user_id: id,
        },
      });
      return res.status(200).send({
        post,
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  editContent: async (req, res) => {
    const { caption } = req.body;
    await db.Post.update(
      {
        caption,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.send({
      message: "Post Update successfully!",
    });
  },
  deleteContent: async (req, res) => {
    await db.Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).send({
      message: "Delete post",
    });
  },
};
module.exports = postController;
