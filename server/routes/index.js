const express = require('express');
const router = express.Router();

const userController = require('../controllers').user;

router.get('/users', userController.list);

module.exports = router;
