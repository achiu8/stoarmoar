'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Demo',
      lastName: 'User',
      atlasId: 'demouser',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
