'use strict';

module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('provider', {
    name: DataTypes.STRING
  }, {});

  return Provider;
};
