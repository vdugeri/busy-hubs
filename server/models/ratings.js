'use strict';

module.exports = (Sequelize, DataTypes) => {
    const Rating = Sequelize.define('Rating', {
        id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        value: { type: DataTypes.INTEGER },
        emailAddres: { type: DataTypes.STRING },
        review: { type: DataTypes.TEXT }
    }, {
        underscored: true,
        tableName: 'ratings'
    });

    return Rating;
}
