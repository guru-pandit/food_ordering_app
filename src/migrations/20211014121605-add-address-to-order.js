'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Orders', 'deliveryAddress',
        {
          type: Sequelize.STRING,
          after: "deliveryCharges"
        })
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Orders', 'deliveryAddress'),
    ]);
  }
};
