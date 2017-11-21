module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.Company, {
      through: models.queryParameter,
      foreignKey: 'companyId',
      as: 'company'
    });
  };

  return Category;
};
