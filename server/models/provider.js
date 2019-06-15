'use strict';

module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('provider', {
    name: DataTypes.STRING
  }, {});

  Provider.associate = function(models) {
    // associations can be defined here
  };

  return Provider;
};
