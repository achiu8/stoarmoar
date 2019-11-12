const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const google = require('./google');
const users = require('./users');

router.use('/google', google);
router.use('/users', auth, users);

module.exports = router;
