module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    profilePic: DataTypes.BLOB,
    nickName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Review, {
      foreignKey: 'reviewId',
      as: 'review'
    });
    User.hasMany(models.Comment, {
      foreignKey: 'commentId',
      as: 'userComment'
    });
  };

  return User;
};
