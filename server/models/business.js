module.exports = (Sequelize, DataTypes) => {
  
  const Business = Sequelize.define('businesses', {
    id: { type: DataTypes.UUID, unique: true, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING  },
    location: { type: DataTypes.TEXT },
    image_url: { type: DataTypes.STRING },
    owner: { type: DataTypes.STRING }
  }, {
    underscored: true,
    instanceMethods: {
      toJson() {
        let value = this.get();
        return value;
      }
    },
    classMethods: {
      associate(models){
        Business.hasMany(models.Services, {
          through: 'BusinessService'
        });
      }
    }
  });

  return Business;
}