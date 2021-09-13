'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Locations', 'name',
        {
          type: Sequelize.STRING,
          after: "id"
        })
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Locations', 'name',),
    ]);

  }
};
