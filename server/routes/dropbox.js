const express = require('express');
const { authUrl, saveToken, listFiles } = require('../utils/dropbox');

const router = express.Router();

router.get('/auth', (req, res) => {
  saveToken(req.query.access_token)
    .then(() => res.send({ success: true }));
});

router.get('/auth-url', (req, res) => {
  res.send({ url: authUrl() });
});

router.get('/files', (req, res) => {
  listFiles()
    .then(files => res.send({ files }));
});

module.exports = router;
