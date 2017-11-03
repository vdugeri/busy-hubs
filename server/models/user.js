'use strict';
const bcrypt = require('bcrypt');

module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define('User', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDv4 },
    emailAddress: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING }
  }, {
      underscored: true,
      tableName: 'users',
      instanceMethods: {
        toJson() {
          let value = this.get();
          delete value.password;
          return value;
        }
      },
      matchPasswords(candidatePassword, hash) {
        return new Promise((resolve, reject) => {
          bcrypt.compare(candidatePassword, hash, (err, matched) => {
            if (err) {
              reject(err);
            } else {
              resolve(matched);
            }
          });
        });
      }
    });

  User.beforeCreate((user, options, next) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (!err) {
        bcrypt.hash(user.password, salt, (error, hash) => {
          if (error) {
            next(err);
          } else {
            user.password = hash;
            next();
          }
        });
      }
    });
  });

  return User;
};
