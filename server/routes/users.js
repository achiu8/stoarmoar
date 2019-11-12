const express = require('express');
const router = express.Router();

const users = require('../controllers/users');

router.get('/current', users.current);
router.get('/users', users.list);

module.exports = router;
