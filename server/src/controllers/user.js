const db = require("../models");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const moment = require("moment");
const mailer = require("../lib/mailer");
const url_reset = process.env.url_reset;
const url_verif = process.env.url_verif;
const avatar_url = process.env.avatar_url;

const userController = {
  register: async (req, res) => {
    try {
      const { username, email, password, fullname } = req.body;
      const hashPassword = await bcrypt.hashSync(password, 10);

      const findEmail = await db.User.findOne({
        where: {
          email,
        },
      });
      const findUsername = await db.User.findOne({
        where: {
          username,
        },
      });

      if (findEmail) {
        return res.status(400).send({
          message: "Email has been used",
        });
      } else if (findUsername) {
        return res.status(400).send({
          message: "Username has been used",
        });
      }
      if (!findEmail) {
        await db.User.create({
          username,
          email,
          password: hashPassword,
          fullname,
        });

        res.status(200).send({
          message: "Successfully Create Account",
        });
      } else {
        res.status(500).send({
          message: "Register Failed, please try again.",
        });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  login: async (req, res) => {
    try {
      const { emailOrUsername, password } = req.body;
      const findUser = await db.User.findOne({
        where: {
          [db.Sequelize.Op.or]: [
            {
              email: emailOrUsername,
            },
            {
              username: emailOrUsername,
            },
          ],
        },
      });

      if (!findUser) {
        throw new Error("Wrong email or username");
      }

      const isPasswordValid = bcrypt.compareSync(password, findUser.password);
      if (isPasswordValid) {
        const payload = {
          id: findUser.dataValues.id,
        };

        const token = await db.Token.create({
          expired: moment().add(1, "day").format(),
          token: nanoid(),
          status: "Login",
          payload: JSON.stringify(payload),
        });
        return res.status(200).send({
          message: "Succesfully Login",
          data: findUser.dataValues,
          token: token.dataValues.token,
        });
      } else {
        throw new Error("Wrong Password");
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
      // console.log(findToken);

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
    res.send({
      user: req.user,
      message: "Succesfully Login!",
    });
  },
  verify: async (req, res) => {
    try {
      const { email } = req.params;
      const user = await db.User.findOne({
        where: {
          email,
        },
      });
      const payload = user.dataValues.id;
      const token = await db.Token.create({
        expired: moment().add(1, "day").format(),
        token: nanoid(),
        payload: JSON.stringify({ id: payload }),
        status: "VERIFY",
      });

      await mailer({
        subject: "Verify Account",
        to: user.dataValues.email,
        text: url_verif + token.dataValues.token,
      });

      return res.send({
        message: "Please, check your email.",
        token: token.dataValues.token,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  verifyByToken: async (req, res) => {
    try {
      let token = req.headers.authorization;
      const { id } = req.user;
      await db.User.update(
        {
          status: "verified",
        },
        {
          where: {
            id,
          },
        }
      );
      await db.Token.update(
        {
          valid: false,
        },
        {
          where: {
            token,
          },
        }
      );
      return res.send({ message: "Your account successfully verified" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        Error: err.message,
      });
    }
  },
  forgotPass: async (req, res) => {
    try {
      const { email } = req.params;
      const user = await db.User.findOne({
        where: {
          email,
        },
      });

      if (user) {
        await db.Token.update(
          {
            valid: false,
          },
          {
            where: {
              payload: JSON.stringify({ id: user.dataValues.id }),
              status: "FORGOT-PASSWORD",
            },
          }
        );

        const payload = user.dataValues.id;
        const token = await db.Token.create({
          expired: moment().add(1, "day").format(),
          token: nanoid(),
          payload: JSON.stringify({ id: payload }),
          status: "FORGOT-PASSWORD",
        });

        mailer({
          subject: "Reset Password",
          to: user.dataValues.email,
          text: url_reset + token.dataValues.token,
        });

        return res.send({
          message: "We're already send an link to your email",
          token: token.token,
        });
      } else {
        throw new Error("Email not found");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  resetPass: async (req, res) => {
    try {
      let token = req.headers.authorization;
      const { password } = req.body;
      const { id } = req.user;
      const hashPassword = await bcrypt.hashSync(password, 10);

      await db.User.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id,
          },
        }
      );
      await db.Token.update(
        {
          valid: false,
        },
        {
          where: {
            token,
          },
        }
      );
      return res.send({ message: "Reset password succesfully, arigatou" });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editProfile: async (req, res) => {
    try {
      const data = { ...req.body };
      const filename = req.file?.filename;

      if (filename) {
        data.avatar_url = avatar_url + filename;
      }

      await db.User.update(data, {
        where: {
          id: req.params.id,
        },
      });

      const user = await db.User.findOne({
        where: {
          id: req.params.id,
        },
      });

      return res.status(200).send({
        user,
        message: "Profile data has been changed",
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Username already exist");
    }
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
