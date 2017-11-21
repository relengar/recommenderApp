module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    commentType: DataTypes.STRING // by company or user
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Review, {
      foreignKey: 'reviewId',
      as: 'commentedReview'
    });
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'commentingUser'
    });
  };

  return Comment;
};
