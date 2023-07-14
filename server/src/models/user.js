module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      fullname: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      avatar_url: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      bio: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("verified", "unverified"),
        defaultValue: "unverified",
      },
    },
    {
      indexes: [
        { unique: true, fields: ["email"] },
        { unique: true, fields: ["username"] },
      ],
    },
    {
      paranoid: true,
    }
  );
  return User;
};
