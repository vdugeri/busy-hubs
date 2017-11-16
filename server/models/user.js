'use strict';
const bcrypt = require('bcrypt');

module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define('User', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    emailAddress: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING }
  }, {
      underscored: true,
      tableName: 'users',
      instanceMethods: {
        toJson () {
          let value = this.get();
          delete value.password;
          return value;
        },
        matchPasswords (candidatePassword, hash) {
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
      },
    });

  User.beforeCreate((user, options, next) => {
    bcrypt.genSalt(10).then(salt => {
      bcrypt.hash(user.password, salt).then(hash => {
        user.password = hash;
        next(null, user);
      });
    }).catch(err => {
      next(err);
    });
  });

  return User;
};
