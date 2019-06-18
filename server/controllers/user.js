const { user, account, provider } = require('../models');

module.exports = {
  list(req, res) {
    return user
      .findAll({
        include: [
          {
            model: account,
            attributes: ['id'],
            include: [provider]
          }
        ],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then(users => res.status(200).send(users))
      .catch(err => res.status(404).send(err));
  },
};
