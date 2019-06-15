const User = require('../models').user;
const { withToken } = require('../utils//auth');
const { findOrCreateByUserAndProvider } = require('./account');

const findOrCreateByEmail = ({ email, firstName, lastName, token }) =>
  User.findOrCreate({
    where: { email },
    defaults: { firstName, lastName }
  })
    .then(([user]) => findOrCreateByUserAndProvider(user.id, 1, token).then(() => user))
    .then(withToken)
    .catch(err => console.log('Error finding or creating user:', err));

module.exports = {
  findOrCreateByEmail
};
