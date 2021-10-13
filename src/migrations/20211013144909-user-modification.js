'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Users', 'googleId',
        {
          type: Sequelize.STRING,
        }),
      queryInterface.changeColumn('Users', 'facebookId',
        {
          type: Sequelize.STRING,
        })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
