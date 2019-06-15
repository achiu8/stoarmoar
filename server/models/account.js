'use strict';

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('account', {
    userId: DataTypes.INTEGER,
    providerId: DataTypes.INTEGER,
    token: DataTypes.JSON,
    files: DataTypes.JSON
  }, {});

  Account.associate = function(models) {
    Account.belongsTo(models.user, { foreignKey: 'userId' });
  };

  return Account;
};
