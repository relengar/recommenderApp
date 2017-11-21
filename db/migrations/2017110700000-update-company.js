module.exports= {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Companies', 'ownerId', {
      type: Sequelize.INTEGER,
      onDelete: "CASCADE",
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
        as: "ownerId"
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    // return queryInterface.
  }
};
