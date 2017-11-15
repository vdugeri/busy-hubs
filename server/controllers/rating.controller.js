const models = require('../models');

module.exports = {
  index,
  create,
  find,
  update,
  destroy
};


const index = (req, res) => {
  const { params } = req;
  const { bid } = params;

  models.Rating.findAll({
    where: {
      business_id: bid
    }
  }).then(ratings => {
    return res.status(200).json(ratings);
  }).catch(err => {
    return res.status(500).json({ error: 'A server error occured'});
  });
};

const create = (req, res) => {
  const { body, params } = req;
  const { bid } = params;
  const { value, emailAddress, review} = body;

  const rating = {
    value,
    emailAddress,
    review,
    business_id: bid,
  }

  models.Rating.create(rating).then(newRating => {
    return res.status(200).json(newRating);
  }).catch(err => {
    return res.status(500).json({ error: 'Unable to save rating at the moment. Please try again' });
  });
};

const find = (req, res) => {
  const { params } = req;
  const { bid, id } = params;

  models.Rating.findOne({
    where: {
      business_id,
      id,
    }
  }).then(rating => {
    return res.status(200).json(rating);
  }).catch(err => {
    return res.status(500).json({ error: 'Could not retrieve rating at the moment. Please try again' });
  });
};

const update = (req, res) => {
  const { params, body } = req;
  const { bid, id } = params;
  const { value, emailAddress, review } = body;

  models.Rating.findOne({
    where: {
      business_id: bid,
      id,
    }
  }).then(rating => {
    if (rating) {
      rating.value = value;
      rating.emailAddress = emailAddress;
      rating.review = review;

      rating.save().then(updatedRating => {
        return res.status(200).json(updatedRating);
      });
    } else {
      return res.status(404).json({ error: 'Review not found' });
    }
  }).catch(err => {
    return res.status(500).json({ error: 'Unable to update rating' });
  });
};

const destroy = (req, res) => {
  const { params } = req;
  const { bid, id } = params;

  models.Rating.findOne({
    where: {
      id,
      business_id: bid,
    }
  }).then(rating => {
    if (rating) {
      rating.destroy().then(rating => {
        return res.status(200).json({ message: 'Review deleted' });
      });
    } else {
      return res.status(404).json({message: 'Review not found' });
    }
  }).catch(err => {
    return res.status(500).json({error: 'Unable to delete review' });
  });
}
