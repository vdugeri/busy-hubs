'use strict';

const models = require('../models');

const index = (req, res) => {
  const id = req.params.bid;
  models.Location.findAll({ where: { business_id: id } }).then(locations => {
    return res.status(200).json(locations);
  }).catch(err => {
    return res.status(500).json({ error: err.message });
  });
};

const create = (req, res) => {
const { bid } = req.params;
const { long, lat, value } = req.body;

const location = {
	business_id: bid,
	long,
	lat,
	value,
};

models.Location.create(location).then(location => {
	return res.status(200).json(location);
}).catch(err => {
	return res.status(500).json({ error: err.message });
});
};

const find = (req, res) => {
  const { bid, id } = req.params;
  models.Location.findOne({
    where: {
      business_id: bid,
      id,
    }
  }).then(location => {
    return res.status(200).json(location);
  }).catch(err => {
    res.status(500).json(err);
  });
};

const update = (req, res) => {
  const { params, body } = req;
  const { bid, id } = params;
  const { value, long, lat } = body;

	models.Business.findById(bid).then(business => {
		if (business) {
			models.Location.findById(id).then(location => {
        location.value = value;
        location.long = long;
        location.lat = lat;

        location.save().then(updated => {
          return res.status(200).json(updated);
        }).catch(err => {
          return res.status(500).json({ error: err.message});
        })
			}).catch(err => {
        return res.status(500).json({ message: err.message });
      });
		} else {
      return res.status(404).json({ message: 'Invalid business location' });
		}
	});
}

const destroy = (req, res) => {
  const { params } = req;
  const { bid, id } = params;

  models.Location.findOne({
    where: {
      id,
      business_id: bid,
    }
  }).then(location => {
    if (location) {
      location.destroy().then(location => {
        return res.status(200).json({ message: 'Location successfuly deleted' });
      });
    } else {
      return res.status(404).json({ message: 'Location already deleted' });
    }
  }).catch(err => {
    return res.status(500).json({ error: err.message });
  });
}

module.exports = {
  index,
  create,
  find,
  update,
  destroy,
}
