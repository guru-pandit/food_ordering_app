'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cuisines',
      [
        {
          name: "Maharashtrian",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "South Indian",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "North Indian",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Chinese",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Italian",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cuisines', null, {});

  }
};
