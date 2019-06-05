const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/', userController.addUser);
router.get('/', userController.list);
router.get('/:userId', userController.find);

module.exports = router;
