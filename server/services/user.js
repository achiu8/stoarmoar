const User = require('../models').user;
const Account = require('../models').account;
const { withToken } = require('../utils//auth');

const findOrCreateByEmail = ({ email, firstName, lastName, token }) =>
  User.findOrCreate({
    where: { email },
    defaults: { firstName, lastName, token }
  })
    .then(([user]) => Account.findOrCreate({
      where: {
        userId: user.id,
        providerId: 1
      },
      defaults: { token }
    }).then(() => user))
    .then(withToken)
    .catch(err => console.log('Error finding or creating user:', err));

const findTokenById = id =>
  User.findByPk(id, { attributes: ['token'] })
    .then(user => user.get('token'));

module.exports = {
  findOrCreateByEmail,
  findTokenById
};
