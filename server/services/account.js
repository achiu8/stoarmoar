const Account = require('../models').account;

const findTokenByUserAndProvider = (userId, providerId) =>
  Account.findOne({
    where: { userId, providerId },
    attributes: ['token']
  })
    .then(account => JSON.parse(account.get('token')));

module.exports = {
  findTokenByUserAndProvider
};
