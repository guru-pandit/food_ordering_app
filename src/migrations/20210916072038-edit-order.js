'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Orders', 'orderId',
        {
          type: Sequelize.STRING,
          after: "id"
        }),
      queryInterface.addColumn('Orders', 'transactionId',
        {
          type: Sequelize.STRING,
          after: "total"
        }),
      queryInterface.addColumn('Orders', 'orderedAt',
        {
          type: Sequelize.DATE,
          after: "transactionId"
        }),
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Orders', 'orderId'),
      queryInterface.removeColumn('Orders', 'transactionId'),
      queryInterface.removeColumn('Orders', 'orderedAt'),
    ]);
  }
};
