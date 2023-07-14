module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define(
    "Comments",
    {
      comment: Sequelize.STRING,
    },
    {
      paranoid: true,
    }
  );
  return Comment;
};
