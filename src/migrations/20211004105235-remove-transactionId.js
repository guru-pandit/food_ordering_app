'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Orders', 'transactionId'),
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Orders', 'transactionId',
        {
          type: Sequelize.STRING,
          after: "total"
        }),
    ]);
  }
};
