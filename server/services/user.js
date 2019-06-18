const User = require('../models').user;
const Account = require('../models').account;
const Provider = require('../models').provider;
const { withToken } = require('../utils//auth');
const { findOrCreateByUserAndProvider } = require('./account');

const findById = id =>
  User.findByPk(id, {
    include: [
      {
        model: Account,
        attributes: ['id'],
        include: [Provider]
      }
    ]
  })
    .catch(err => console.log('Error finding user:', err));

const findOrCreateByEmail = ({ email, firstName, lastName, token }) =>
  User.findOrCreate({
    where: { email },
    defaults: { firstName, lastName }
  })
    .then(([user]) => findOrCreateByUserAndProvider(user.id, 1, token).then(() => user))
    .then(withToken)
    .catch(err => console.log('Error finding or creating user:', err));

module.exports = {
  findById,
  findOrCreateByEmail
};
