const express = require('express');
const router = express.Router();

const userController = require('../controllers').user;

router.get('/api/user', userController.list);

module.exports = router;
