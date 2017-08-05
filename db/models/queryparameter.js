'use strict';
module.exports = function(sequelize, DataTypes) {
  var queryParameter = sequelize.define('queryParameter', {
    category: DataTypes.STRING,
    location: DataTypes.STRING
  });

  // queryParameter.associate = (models) => {
  //   
  // };

  return queryParameter;
};
