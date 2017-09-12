'use strict';

module.exports = (Sequelize, DataTypes) => {
  const Service = Sequelize.define('services', {
    id: { type: DataTypes.UUID, unique: true, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING}
  }, {
    underscored: true,
    instanceMethods: {
      toJson() {
        let value = this.get();
        return value;
      }
    },
    classMethods: {
      associate(models) {
        Service.belongsToMany(models.Business, {
          through: 'BusinessService'
        });
      }
    }
  })

  return Service;
}
