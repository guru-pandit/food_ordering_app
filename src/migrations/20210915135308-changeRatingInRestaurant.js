'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Restaurants', 'avgRatings',
        {
          type: Sequelize.FLOAT,
        })
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Restaurants', 'avgRatings',
        {
          type: Sequelize.INTEGER,
        })
    ]);

  }
};
