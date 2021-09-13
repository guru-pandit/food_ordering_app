'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Menuitems', 'image',
        {
          type: Sequelize.JSON,

        })
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Menuitems', 'image',
        {
          type: Sequelize.STRING,

        })
    ]);

  }
};
