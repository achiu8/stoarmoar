const express = require('express');
const { authUrl, saveToken, listFiles } = require('../utils/google');

const router = express.Router();

router.get('/auth', (req, res) => {
  saveToken(req.query.code)
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
