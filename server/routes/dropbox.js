const express = require('express');
const { authUrl, saveToken } = require('../utils/dropbox');

const router = express.Router();

router.get('/auth', (req, res) => {
  saveToken(req.query.access_token)
    .then(() => res.send({ success: true }));
});

router.get('/auth-url', (req, res) => {
  res.send({ url: authUrl() });
});

module.exports = router;
