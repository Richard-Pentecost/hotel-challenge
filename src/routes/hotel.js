const express = require('express');
const hotelController = require('../controllers/hotel');

const router = express.Router();

router.post('/', hotelController.create);

module.exports = router;
