'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Menuitems', 'image',
        {
          type: 'JSON USING CAST("image" as JSON)',

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
