'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
        references: {
          model: 'users',
          key: 'id'
        }
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: false
        references: {
          model: 'accounts',
          key: 'id'
        }
      },
      token: {
        type: Sequelize.JSON,
        allowNull: false
      },
      files: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_accounts');
  }
};
