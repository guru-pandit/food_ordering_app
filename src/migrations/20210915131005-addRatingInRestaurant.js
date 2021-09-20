'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Restaurants', 'avgRatings',
        {
          type: Sequelize.INTEGER,
          after: "locationId"
        })
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Restaurants', 'avgRatings',),
    ]);

  }
};
