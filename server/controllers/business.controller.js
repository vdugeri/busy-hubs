'use strict';
const models = require('../models');

const index = (req, res) => {
  models.Business.findAll().then(businesses => {
    console.log('here');
    return res.status(200).json(businesses);
  }).catch(error => {
    console.log('error', error);
    return res.status(500).json(error);
  });
};

const create = (req, res) => {
  const business = {
    name: req.body.name,
    owner: req.body.owner,
    imageUrl: req.body.imageUrl,
  };

    models.Business.create(business).then(business => {
      return res.status(201).json(business);
    }).catch(err => {
      return res.status(500).json({ error: err.message });
    });
};

const find = (req, res) => {
  const id = req.params.id;
  models.Business.findById(id).then(business => {
    if (business) {
      return res.status(200).json(business);
    }
    return res.status(404).json({ message: 'Business not found' });
  }).catch(error => {
    return res.status(500).json(error);
  });
};

const update = (req, res) => {
  const id = req.params.id;

  models.Business.findById(id).then(business => {
    if (business) {
      business.update(req.body).then(updatedBusiness => {
        return res.status(200).json(updatedBusiness);
      }).catch(error => {
        return res.status(500).json(error);
      });
    } else {
      return res.status(404).json({ error: 'Business not found' });
    }
  }).catch(error => {
    return res.status(500).json({ error })
  });
};

const destroy = (req, res) => {
  const id = req.params.id;
  models.Business.findById(id).then(business => {
    if (business) {
      business.destroy().then(() => {
        return res.status(200).json({ message: 'Business deleted' });
      }).catch(err => {
        return res.status(500).json({ error: err.message });
      });
    } else {
      return res.status(404).json({ error: 'Business already deleted' });
    }
  });
};

module.exports = {
  create,
  index,
  find,
  update,
  destroy,
};

