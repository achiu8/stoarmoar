const Account = require('../models').account;
const { crawlFiles } = require('../services/google');

const findOrCreateByUserAndProvider = (userId, providerId, token) =>
  Account.findOrCreate({
    where: { userId, providerId },
    defaults: { token }
  });

const findFilesByUserAndProvider = (userId, providerId) =>
  Account.findOne({
    where: { userId, providerId }
  })
    .then(account =>
      account.get('files')
        ? account.get('files')
        : crawlFiles(account.get('token'))
            .then(files => account.update({ files }).then(() => files)));

module.exports = {
  findOrCreateByUserAndProvider,
  findFilesByUserAndProvider
};
