module.exports = (Sequelize, DataTypes) => {
  const BusinessService = Sequelize.define('business_service', {
    business_id : { type: DataTypes.UUID },
    service_id: { type: DataTypes.UUID }
  }, {
    underscored: true
  });

  return BusinessService;
}