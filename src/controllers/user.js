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

exports.list = (req, res) => {
  User.find({}, (err, users) => {
    if (!users) {
      res.status(400).json({ error: 'There is an error' });
    } else {
      res.status(200).json(users);
    }
  });
};

exports.find = (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (!user) {
      res.status(400).json({ error: 'The user could not be found.' });
    } else {
      res.status(200).json(user);
    }
  });
};
