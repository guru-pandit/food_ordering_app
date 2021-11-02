'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Restaurants', 'image',
        {
          type: 'JSON USING CAST("image" as JSON)',
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
