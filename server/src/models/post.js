module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "Posts",
    {
      location: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      likes: {
        type: Sequelize.STRING,
        defaultValue: 0,
      },
      caption: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
    }
  );
  return Post;
};
