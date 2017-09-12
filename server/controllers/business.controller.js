'use strict';
const models = require('../models');
const underscore = require('lodash');

module.exports = {
  create(req, res) {
    const business = {
      name: req.body.name,
      location: req.body.location,
      owner: req.body.owner
    };

    if (business.location) {
      models.businesses.create(business).then(business => {
        return res.status(201).json(business);
      }).catch (error => {
        res.status(500).json(error);
      });
    }
  },

  index(req, res) {
    models.businesses.findAll().then(businesses => {
      return res.status(200).json(businesses);
    }).catch (error => {
      return res.status(500).json(error);
    });
  },

  find(req, res) {
    const id = req.params.id;
    models.businesses.findById(id).then(business => {
      if (business) {
        return res.status(200).json(business);
      }
      return res.status(404).json({message: 'Business not found'});
    }).catch (error => {
      return res.status(500).json(error);
    });
  },

  update(req, res) {
    const id = req.params.id;

    models
      .businesses
      .findById(id)
      .then(business => {
        if (business) {
          if (req.body.name) {
            business.name = req.body.name;
          }

          if (req.body.location) {
            business.location = req.body.location;
          }

          if (req.body.imageUrl) {
            business.image_url = req.body.imageUrl;
          }

          if (req.body.owner) {
            business.owner = req.body.owner;
          }

          models.businesses.update(business, {
            where: { id }
          }).then(updatedBusiness => {
            return res.status(200).json(updatedBusiness);
          }).catch (error => {
            return res.status(500).json(error);
          });
        } else {
          return res.status(404).json({ error: 'Business not found' });
        }
      }).catch (error => {
        return res.status(500).json({error})
      });
  },

  delete(req, res) {
    const id = req.params.id;

    models.businesses.findById(id).then(business => {
      if (business) {
        business.delete();
        return res.status(200).json({ message: 'Business deleted' });
      }
      return res.status(404).json({ error: 'Business already deleted' });
    });
  }
};

