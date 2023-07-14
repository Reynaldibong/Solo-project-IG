module.exports = (sequelize, Sequelize) => {
  const Likes = sequelize.define("Likes", {
    status: {
      type: Sequelize.ENUM("LIKE", "UNLIKE"),
    },
  });
  return Likes;
};
