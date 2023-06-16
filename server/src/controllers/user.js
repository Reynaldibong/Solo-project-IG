const db = require("../models");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const moment = require("moment");

const userController = {
  register: async (req, res) => {
    try {
      const { username, email, password, fullname } = req.body;

      const findEmail = await db.User.findOne({
        where: {
          email,
        },
      });
      if (findEmail) {
        return res.status(400).send({
          message: "Email has been used",
        });
      }
      const hashPassword = await bcrypt.hashSync(password, 10);

      await db.User.create({
        username,
        email: email,
        password: hashPassword,
        fullname,
      });
      res.status(200).send({
        message: "Successfully Register",
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const findUser = await db.User.findOne({
        where: {
          email,
        },
      });

      if (!findUser) {
        return res.status(400).send({
          message: "user not found",
        });
      }

      const isPasswordValid = bcrypt.compareSync(password, findUser.password);

      if (isPasswordValid) {
        const payload = {
          id: findUser.dataValues.id,
        };
        const generateToken = nanoid();
        const token = await db.Token.create({
          expired: moment().add(1, "h").format(),
          token: generateToken,
          payload: JSON.stringify(payload),
          status: "LOGIN",
          role: findUser.dataValues.role,
        });
        return res.status(200).send({
          message: "succesfully login",
          user_data: findUser,
          token: token.dataValues.token,
        });
      } else {
        return res.status(400).send({
          message: "wrong pasword ",
        });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  getToken: async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      console.log(token);
      token = token.split(" ")[1];
      let findToken = await db.Token.findOne({
        where: {
          token,
          expired: {
            [db.Sequelize.Op.gte]: moment().format(),
          },
          valid: true,
        },
      });
      console.log(findToken);

      if (!findToken) {
        throw new Error("token has expired");
      }

      let user = await db.User.findOne({
        where: {
          id: JSON.parse(findToken.dataValues.payload).id,
        },
      });
      req.user = user;
      // console.log(user);
      next();
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  },
  getUserByToken: async (req, res) => {
    delete req.user.dataValues.password;
    res.send(req.user);
  },

  getAll: async (req, res) => {
    try {
      const user = await db.User.findAll();
      return res.send(user);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = userController;
