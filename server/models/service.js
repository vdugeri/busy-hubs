'use strict';
module.exports = (Sequelize, DataTypes) => {
  const Service = Sequelize.define('Service', {
    id: { type: DataTypes.UUID, unique: true, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING}
  }, {
    underscored: true,
    tableName: 'services'
  });

  return Service;
};
