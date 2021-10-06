'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Orders', 'razorpay_payment_id',
        {
          type: Sequelize.STRING,
          after: "total"
        }),
      queryInterface.addColumn('Orders', 'razorpay_order_id',
        {
          type: Sequelize.STRING,
          after: "razorpay_payment_id"
        }),
      queryInterface.addColumn('Orders', 'razorpay_signature',
        {
          type: Sequelize.STRING,
          after: "razorpay_order_id"
        }),
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Orders', 'razorpay_payment_id'),
      queryInterface.removeColumn('Orders', 'razorpay_order_id'),
      queryInterface.removeColumn('Orders', 'razorpay_signature'),
    ]);
  }
};
