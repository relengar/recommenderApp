module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    coordinates: DataTypes.DECIMAL
  }, {
    classMethods: {
      associate: (models) => {
        Location.belongsToMany(models.Location, {
          through: 'queryParameter',
          foreignKey: 'companyId',
          as: 'company'
        });
        // associations can be defined here
      }
    }
  });
  return Location;
};
