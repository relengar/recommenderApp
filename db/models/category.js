module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        Category.belongsToMany(models.Company, {
          through: 'queryParameter',
          foreignKey: 'companyId',
          as: 'company'
        });
        // associations can be defined here
      }
    }
  });
  return Category;
};
