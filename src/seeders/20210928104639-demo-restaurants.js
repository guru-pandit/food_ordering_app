'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Restaurants',
      [
        {
          name: "The Bombay Chef",
          address: "Sector 6 Rd, new Panvel",
          contact: "9321327685",
          locationId: 1,
          openingTime: "09:00AM",
          closingTime: "12:30AM",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Bhai da Dhaba",
          address: "Shop no. 21, Manjiri Paradise, sector 35E, Kharghar",
          contact: "9856328787",
          locationId: 1,
          openingTime: "07:00AM",
          closingTime: "10:00PM",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Krishna Bhojanalaya",
          address: "Plot no. 7, Swatantra senani marg, nerul",
          contact: "9865254178",
          locationId: 1,
          openingTime: "08:00AM",
          closingTime: "13:30PM",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "The Secret Garden",
          address: "81/82, North main road ext, Koregaon park annexe Mundhawa",
          contact: "8695324512",
          locationId: 2,
          openingTime: "07:00Am",
          closingTime: "10:00PM",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Malaka Spice",
          address: "Siddharth Chambers, lane, Off, Main rd, Koregaon park",
          contact: "9876468894",
          locationId: 2,
          openingTime: "06:00AM",
          closingTime: "10:00PM",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Baan Tao",
          address: "Hyatt Pune 88, Nagar Rd, Palace view society, Kalyani nagar",
          contact: "9562348754",
          locationId: 2,
          openingTime: "06:00AM",
          closingTime: "10:00PM",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Shakahari",
          address: "Senapati Bapat Rd, Laxmi society, Model colony, shivajinagar",
          contact: "7845326598",
          locationId: 2,
          openingTime: "06:00AM",
          closingTime: "11:00PM",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Restaurants', null, {});

  }
};
