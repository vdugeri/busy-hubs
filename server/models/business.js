'use strict';
module.exports = (Sequelize, DataTypes) => {

  const Business = Sequelize.define('Business', {
    id: { type: DataTypes.UUID, unique: true, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING, unique: true  },
    imageUrl: { type: DataTypes.STRING },
    owner: { type: DataTypes.STRING }
  }, {
    underscored: true,
    tableName: 'businesses',
  });

  return Business;
};
