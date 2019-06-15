const Account = require('../models').account;

const findOrCreateByUserAndProvider = (userId, providerId, token) =>
  Account.findOrCreate({
    where: { userId, providerId },
    defaults: { token }
  });

const findTokenByUserAndProvider = (userId, providerId) =>
  Account.findOne({
    where: { userId, providerId },
    attributes: ['token']
  })
    .then(account => account.get('token'));

module.exports = {
  findOrCreateByUserAndProvider,
  findTokenByUserAndProvider
};
