const express = require('express');

const auth = require('../middlewares/auth');
const google = require('../controllers/google');

const router = express.Router();

router.get('/auth', google.auth);
router.get('/auth-url', google.getAuthUrl);
router.get('/files', auth, google.files);
router.post('/files', auth, google.updateFiles);

module.exports = router;
