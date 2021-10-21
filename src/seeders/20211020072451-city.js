'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Cities',
      [
        {
          name: "Ahmednagar",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Akola",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Amravati",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Aurangabad",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Beed",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Bhandara",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Buldhana",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Chandrapur",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Dhule",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Gadchiroli",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Gondia",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Hingoli",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Jalgaon",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Jalna",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Kolhapur",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Latur",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Mumbai City",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Mumbai Suburban",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Nagpur",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Nanded",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Nandurbar",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Nashik",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Osmanabad",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Palghar",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Parbhani",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Pune",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Raigad",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Ratnagiri",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Sangli",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Satara",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Sindhudurg",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Solapur",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Thane",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Wardha",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Washim",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Yavatmal",
          stateId:21,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Cities', null, {});
  }
};
