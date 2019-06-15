'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'token');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'token', {
      type: Sequelize.JSON
    });
  }
};
