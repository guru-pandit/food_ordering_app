'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Countries',
      [
        {
          name: "India",
          countryCode: "IN",
          currency: "INR",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Countries', null, {});
  }
};
