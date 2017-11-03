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
	models.Business.findById(bid).then(business => {
		if (business) {
			models.Location.find(id).then(location => {
				return res.status(200).json(location);
			}).catch(err => {
				return res.status(500).json({ error: err.message });
			});
		} else {
			return res.status(404).json({ message: 'Invalid business location' });
		}
	}).catch(err => {
		return res.status(500).json({ error: err.message });
	});
};

const update = (req, res) => {
	const { bid, id } = req.params;

	models.Business.findById(bid).then(business => {
		if (business) {
			models.Location.find(id).then(location => {
				location.update()
			})
		} else {
				return res.status(404).json({ message: 'Invalid location id' });
		}
	})
}

module.exports = {
  index,
  create,
  find,
  update,
  destroy,
}
