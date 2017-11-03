'use strict';

module.exports = (Sequelize, DataTypes) => {
  const Report = Sequelize.define('Report', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    reason: { type: DataTypes.TEXT },
    emailAddress: { type: DataTypes.STRING }
  }, {
      underscored: true,
      tableName: 'reports'
    });

  return Report;
};
