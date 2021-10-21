'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Locations', 'cityId',
        {
          type: Sequelize.INTEGER,
          after: "landmark"
        }),
      queryInterface.removeColumn('Locations', 'name'),
      queryInterface.removeColumn('Locations', 'city'),
      queryInterface.removeColumn('Locations', 'state'),
      queryInterface.removeColumn('Locations', 'country'),
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Locations', 'cityId'),
      queryInterface.addColumn('Locations', 'name',
        {
          type: Sequelize.STRING,
        }),
      queryInterface.addColumn('Locations', 'city',
        {
          type: Sequelize.STRING,
        }),
      queryInterface.addColumn('Locations', 'state',
        {
          type: Sequelize.STRING,
        }),
      queryInterface.addColumn('Locations', 'country',
        {
          type: Sequelize.STRING,
        }),
    ]);
  }
};
