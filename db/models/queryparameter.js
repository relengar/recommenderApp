'use strict';
module.exports = function(sequelize, DataTypes) {
  var queryParameter = sequelize.define('queryParameter', {
    category: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return queryParameter;
};