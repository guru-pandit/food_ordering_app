'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Restaurants', 'image',
        {
          type: Sequelize.JSON,
        })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Restaurants', 'image',
        {
          type: Sequelize.STRING,
        })
    ]);
  }
};
