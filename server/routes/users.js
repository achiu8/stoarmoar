const express = require('express');

const users = require('../controllers/users');

const router = express.Router();

router.get('/current', users.current);
router.get('/', users.list);

module.exports = router;
