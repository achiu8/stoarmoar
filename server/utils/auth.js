const jwt = require('jsonwebtoken');

const secret = 'secret-key';

const withToken = user => ({
  token: jwt.sign({ id: user.id }, secret)
});

const verifyToken = (token, cb) =>
  jwt.verify(token, secret, cb);

module.exports = {
  withToken,
  verifyToken
};
