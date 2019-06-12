const User = require('../models').user;

const findOrCreateByEmail = ({ email, firstName, lastName, token }) =>
  User.findOrCreate({
    where: { email },
    defaults: { firstName, lastName, token }
  })
    .then(([user]) => user)
    .catch(err => console.log('Error finding or creating user:', err));

module.exports = {
  findOrCreateByEmail
};
