const Hotel = require('../models/hotel');

const isNumeric = (string) => {
  return !Number.isNaN(parseInt(string));
};

exports.create = (req, res) => {
  const newHotel = new Hotel({
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
  });

  if (isNumeric(newHotel.name) || isNumeric(newHotel.email)) {
    res.status(400).json({ error: 'There was an error' });
  } else {
    newHotel.save().then(() => {
      res.status(200).json(newHotel);
    });
  }
};
