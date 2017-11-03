'use strict';

module.exports = (Sequelize, DataTypes) => {
  const Location = Sequelize.define('Location', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    value: { type: DataTypes.STRING },
    long: { type: DataTypes.DOUBLE },
    lat: { type: DataTypes.DOUBLE }
  }, {
    underscored: true,
    tableName: 'locations'
  });

  return Location;
};
