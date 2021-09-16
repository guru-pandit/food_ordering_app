'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Reviews', 'comment',
        {
          type: Sequelize.TEXT,
        }),
      queryInterface.changeColumn('Menuitems', 'description',
        {
          type: Sequelize.TEXT,
        }),
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Reviews', 'comment',
        {
          type: Sequelize.STRING,
        }),
      queryInterface.changeColumn('Menuitems', 'description',
        {
          type: Sequelize.STRING,
        }),
    ]);

  }
};
