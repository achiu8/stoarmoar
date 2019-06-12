'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.addColumn('users', 'token', {
          type: Sequelize.JSON
        }, { transaction }),
        queryInterface.renameColumn('users', 'atlasId', 'email', { transaction })
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.removeColumn('users', 'token', { transaction }),
        queryInterface.renameColumn('users', 'email', 'atlasId', { transaction })
      ]);
    });
  }
};
