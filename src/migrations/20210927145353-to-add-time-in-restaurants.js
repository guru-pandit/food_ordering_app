'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Restaurants', 'openingTime',
        {
          type: Sequelize.STRING,
          after: "avgRatings"
        }),
      queryInterface.addColumn('Restaurants', 'closingTime',
        {
          type: Sequelize.STRING,
          after: "openingTime"
        }),
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Restaurants', 'openingTime'),
      queryInterface.removeColumn('Restaurants', 'closingTime'),
    ]);
  }
};
