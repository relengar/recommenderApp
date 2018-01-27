'use strict';
module.exports = function(sequelize, DataTypes) {
  const queryParameter = sequelize.define('queryParameter', {
    category: DataTypes.INTEGER,
    // location: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER
  });

  // queryParameter.associate = (models) => {
  //
  // };

  return queryParameter;
};
