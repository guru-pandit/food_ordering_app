'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Restaurants', 'image',
        {
          type: Sequelize.STRING,
          after: "closingTime"
        })
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Restaurants', 'image'),
    ]);
  }
};
