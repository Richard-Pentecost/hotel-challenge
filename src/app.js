const express = require('express');
const userRouter = require('./routes/user');

const app = express();

app.get('*', (req, res) => {
  res.status(200).json({ message: 'Welcome to the hotels api' });
});

app.use(express.json());
app.use('/users', userRouter);

module.exports = app;
