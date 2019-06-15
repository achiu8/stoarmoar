'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserAccount = sequelize.define('userAccount', {
    userId: DataTypes.INTEGER,
    accountId: DataTypes.INTEGER,
    token: DataTypes.JSON,
    files: DataTypes.JSON
  }, {});

  UserAccount.associate = function(models) {
    UserAccount.belongsTo(models.user, { foreignKey: 'userId' });
  };

  return UserAccount;
};
