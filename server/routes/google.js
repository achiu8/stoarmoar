const express = require('express');

const auth = require('../middlewares/auth');
const { findTokenByUserAndProvider } = require('../services/account');
const { findOrCreateByEmail } = require('../services/user');
const { crawlFiles, getUser } = require('../services/google');
const { authUrl, getToken, saveFiles, loadFiles } = require('../utils/google');

const router = express.Router();

router.get('/auth', (req, res) => {
  getToken(req.query.code)
    .then(token => getUser(token).then(user => findOrCreateByEmail({
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
      token
    })))
    .then(data => res.json(data));
});

router.get('/auth-url', (req, res) => {
  res.send({ url: authUrl() });
});

router.get('/files', auth, (req, res) => {
  loadFiles()
    .then(data =>
      data
        ? data
        : findTokenByUserAndProvider(req.userId, 1)
            .then(crawlFiles)
            .then(saveFiles)
    )
    .then(([files]) => res.send(files));
});

module.exports = router;
