const jwt = require('jsonwebtoken');

const withToken = user => ({
  token: jwt.sign({ id: user.id }, 'secret-key')
});

module.exports = {
  withToken
};
