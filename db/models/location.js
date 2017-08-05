module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    coordinates: DataTypes.DECIMAL
  });

  Location.associate = (models) => {
    Location.belongsToMany(models.Location, {
      through: 'queryParameter',
      foreignKey: 'companyId',
      as: 'company'
    });
  };

  return Location;
};
