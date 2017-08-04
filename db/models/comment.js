module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    commentType: DataTypes.STRING // by company or user
  }, {
    classMethods: {
      associate: (models) => {
        Comment.belongsTo(models.Review, {
          foreignKey: 'reviewId',
          as: 'commentedReview'
        });
        Comment.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'commentingUser'
        });
        Comment.belongsTo(models.Company, {
          foreignKey: 'companyId',
          as: 'commentingCompany',
        });
      }
    }
  });
  return Comment;
};
