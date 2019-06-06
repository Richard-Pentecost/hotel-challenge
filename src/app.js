const express = require('express');
const userRouter = require('./routes/user');
const hotelRouter = require('./routes/hotel');

const app = express();

// app.get('*', (req, res) => {
//   res.status(200).json({ message: 'Welcome to the hotels api' });
// });

app.use(express.json());
app.use('/users', userRouter);
app.use('/hotels', hotelRouter);

module.exports = app;
