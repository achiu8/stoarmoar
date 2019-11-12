const express = require('express');
const router = express.Router();

const google = require('./google');
const users = require('./users');

router.use('/google', google);
router.use('/users', users);

module.exports = router;
