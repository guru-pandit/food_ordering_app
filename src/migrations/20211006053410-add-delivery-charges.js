'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Orders', 'deliveryCharges',
        {
          type: Sequelize.INTEGER,
          after: "gst"
        })
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Orders', 'deliveryCharges'),
    ]);
  }
};
