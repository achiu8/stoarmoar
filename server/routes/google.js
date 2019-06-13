const express = require('express');

const auth = require('../middlewares/auth');
const { findTokenById, findOrCreateByEmail } = require('../services/user');
const { authUrl, getToken, listFiles, getUser } = require('../utils/google');

const router = express.Router();

router.get('/auth', (req, res) => {
  getToken(req.query.code)
    .then(token => getUser(token).then(user => findOrCreateByEmail({
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
      token: JSON.stringify(token)
    })))
    .then(data => res.json(data));
});

router.get('/auth-url', (req, res) => {
  res.send({ url: authUrl() });
});

router.get('/files', auth, (req, res) => {
  findTokenById(req.userId)
    .then(listFiles(req.query.parent))
    .then(files => res.send({ files }));
});

module.exports = router;
