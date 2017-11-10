'use strict';

const models = require('../models');
const lodash = require('lodash');



module.exports = {
  index,
  create,
  find,
  update,
  destroy,
};

const index = (req, res) => {
  models.User.findAll().then(users => {
    return res.status(200).json(users);
  }).catch(err => {
    console.log(err);
    return res.status(500).json({ error: err.message });
  });
};

const create = (req, res) => {
  const { body } = req;
  const { emailAddress, password } = body;

  const user = {
    emailAddress,
    password,
  };

  models.User.create(user).then(newUser => {
    return res.status(200).json(newUser.toJson());
  }).catch(err => {
    return res.status(500).json({ error: 'Unable to create user. Please try again' });
  });
};

const find = (req, res) => {
  const id = req.params.id;
  models.User.findById(id).then(user => {
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ message: 'User not found' });
  }).catch(err => {
    return res.status(500).json({ error: err.message });
  });
};

const update = (req, res) => {
  const id = req.params.id;
  models.User.findById(id).then(user => {
    if (user) {
      const _user = lodash.pick(req.bpdy, ['emailAddress']);
      const { emailAddress } = _user;
      const oldEmail = user.emailAddress;

      if (emailAddress) {
        utils.ChangeEmailAdress(oldEmail, emailAddress); //TODO: create util to change email and password
      }
      user.emailAddress = emailAddress;

      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  }).catch(err => {
    res.status(500).json({ error: err.message });
  });
};

const destroy = (req, res) => {
  const id = req.params.id;

  models.User.findById(id).then(user => {
    if (user) {
      user.destroy();
      return res.status(200).json({ message: 'User deleted' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  }).catch(err => {
    return res.status(500).json({ error: err.message });
  });
};
