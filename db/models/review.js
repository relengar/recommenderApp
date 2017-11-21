module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    content: DataTypes.STRING,
    rating: DataTypes.INTEGER
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'reviewer'
    });
    Review.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'reviewedCompany',
    });
    Review.hasMany(models.Comment, {
      foreignKey: 'reviewId',
      as: 'comments'
    });
  };

  return Review;
};
