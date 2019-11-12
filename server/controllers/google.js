const {
  findFilesByUserAndProvider,
  updateFilesForUserAndProvider
} = require('../services/account');
const { findOrCreateByEmail } = require('../services/user');
const { getUser } = require('../services/google');
const { authUrl, getToken } = require('../utils/google');

const auth = (req, res) =>
  getToken(req.query.code)
    .then(token => getUser(token).then(user => findOrCreateByEmail({
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
      token
    })))
    .then(data => res.json(data));

const getAuthUrl = (req, res) =>
  res.send({ url: authUrl() });

const files = (req, res) =>
  findFilesByUserAndProvider(req.userId, 1)
    .then(([files]) => res.send(files));

const updateFiles = (req, res) =>
  updateFilesForUserAndProvider(req.userId, 1, req.body)
    .then(([files]) => res.send(files));

module.exports = {
  auth,
  getAuthUrl,
  files,
  updateFiles
};
