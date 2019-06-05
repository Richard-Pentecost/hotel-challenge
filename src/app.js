const express = require('express');

const app = express();

app.get('*', (req, res) => {
  res.status(200).json({ message: 'Welcome to the hotels api' });
});

module.exports = app;
