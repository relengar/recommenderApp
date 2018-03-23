module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    motto: DataTypes.STRING,
    ICO: DataTypes.STRING,
    email: DataTypes.STRING,
    coordsMaxLat: DataTypes.FLOAT,
    coordsMinLat: DataTypes.FLOAT,
    coordsMaxLon: DataTypes.FLOAT,
    coordsMinLon: DataTypes.FLOAT,
    coordsLat: DataTypes.FLOAT,
    coordsLon: DataTypes.FLOAT,
    coordsRad: DataTypes.BIGINT,
    homepage: DataTypes.STRING,
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: DataTypes.INTEGER,
    ratingHistory: DataTypes.JSON // rating obj example: [{value: 3, weigth, 3.3}, {value: 8, weigth: 0.3}]
  });

  Company.associate = (models) => {
    Company.belongsToMany(models.Category, {
      through: models.queryParameter,
      foreignKey:'category',
      as: 'category'
    });
    Company.belongsTo(models.User, {
      foreignKey: 'ownerId',
      as: 'owner'
    });
    Company.hasMany(models.Review, {
      foreignKey:'companyId',
      as: 'reviews'
    });
  };

  return Company;
};
