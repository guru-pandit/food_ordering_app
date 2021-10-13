'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'googleId',
        {
          type: Sequelize.INTEGER,
          after: "city"
        }),
      queryInterface.addColumn('Users', 'facebookId',
        {
          type: Sequelize.INTEGER,
          after: "googleId"
        })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'googleId'),
      queryInterface.removeColumn('Users', 'facebookId'),
    ]);
  }
};
