'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Menuitems', 'cuisineId',
        {
          type: Sequelize.INTEGER,
          after: "mealtypeId"
        })
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Menuitems', 'cuisineId',),
    ]);

  }
};
