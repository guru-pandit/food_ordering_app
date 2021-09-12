'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Locations',
      [
        {
          landmark: "Teen Taki",
          city: "Navi Mumbai",
          state: "Maharashtra",
          country: "India",
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          landmark: "Pimple Nilakh",
          city: "Pune",
          state: "Maharashtra",
          country: "India",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          landmark: "Chadani Chowk",
          city: "Delhi",
          state: "Delhi",
          country: "India",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          landmark: "Shivaji Nagar",
          city: "Bangalore",
          state: "Karnataka",
          country: "India",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          landmark: "Kaveri Street",
          city: "Chennai",
          state: "Tamil Nadu",
          country: "India",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Locations', null, {});

  }
};
