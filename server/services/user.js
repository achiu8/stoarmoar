const { compose, head } = require('ramda');
const User = require('../models').user;
const { withToken } = require('../utils//auth');

const findOrCreateByEmail = ({ email, firstName, lastName, token }) =>
  User.findOrCreate({
    where: { email },
    defaults: { firstName, lastName, token }
  })
    .then(compose(withToken, head))
    .catch(err => console.log('Error finding or creating user:', err));

const findTokenById = id =>
  User.findByPk(id, { attributes: ['token'] })
    .then(user => user.get('token'));

module.exports = {
  findOrCreateByEmail,
  findTokenById
};
