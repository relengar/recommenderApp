module.exports = (sequelize, DataTypes) => {
  var Review = sequelize.define('Review', {
    content: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
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
          as: 'comment'
        });
        // associations can be defined here
      }
    }
  });
  return Review;
};
