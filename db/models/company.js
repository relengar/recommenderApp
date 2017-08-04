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
    coordinates: DataTypes.FLOAT,
    homepage: DataTypes.STRING,
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        Company.belongsToMany(models.Location, {
          through: 'queryParameter',
          foreignKey:'locationId',
          as: 'location'
        });
        Company.belongsToMany(models.Category, {
          through: 'queryParameter',
          foreignKey:'categoryId',
          as: 'category'
        });
        Company.hasMany(models.Review, {
          foreignKey:'companyId',
          as: 'review'
        });
        Company.hasMany(models.Comment, {
          foreignKey:'companyId',
          as: 'comment'
        });
      }
    }
  });
  return Company;
};
