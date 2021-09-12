'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Restaurants',
      [
        {
          name: "Royal Baithak",
          address: "Satara Plaza, 1st Floor, palm Beach Rd, Sector-19",
          contact: "9876457894",
          locationId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Kabablo",
          address: "Commercial Complex, shop 6, New DP Rd",
          contact: "9067200751",
          locationId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Lakhori",
          address: "2293, gali anar, dharam pura",
          contact: "7867543224",
          locationId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Hotel Empire",
          address: "28, central st, tasker town",
          contact: "9876457889",
          locationId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "V cafe",
          address: "Shop No.21, 21, Road ",
          contact: "9876468894",
          locationId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Restaurants', null, {});

  }
};
