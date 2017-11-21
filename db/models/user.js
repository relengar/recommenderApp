module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    profilePic: DataTypes.BLOB
  });

  User.associate = (models) => {
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'review'
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'userComment'
    });
    User.hasMany(models.Company, {
      foreignKey: 'ownerId',
      as:'myCompany'
    });
  };

  return User;
};
