const User = require('../models/user');

const isNumeric = (string) => {
  return !Number.isNaN(parseInt(string));
};

exports.addUser = (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
  });
  if (isNumeric(newUser.name) || isNumeric(newUser.email)) {
    res.status(400).json({ error: 'User information invalid!' });
  } else {
    newUser.save().then(() => {
      res.status(200).json(newUser);
    });
  }
};
