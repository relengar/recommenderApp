module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      motto: {
        type: Sequelize.STRING
      },
      ICO: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      coordsMaxLat: {
        type: Sequelize.FLOAT
      },
      coordsMinLat: {
        type: Sequelize.FLOAT
      },
      coordsMaxLon: {
        type: Sequelize.FLOAT
      },
      coordsMinLon: {
        type: Sequelize.FLOAT
      },
      coordsLat: {
        type: Sequelize.FLOAT
      },
      coordsLon: {
        type: Sequelize.FLOAT
      },
      coordsRad: {
        type: Sequelize.BIGINT
      },
      homepage: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER
      },
      ratingHistory: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    // return queryInterface.dropTable('Companies');
    return queryInterface.dropAllTables();
  }
};
