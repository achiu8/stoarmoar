const { user, account } = require('../models');

module.exports = {
  list(req, res) {
    return user
      .findAll({
        include: [account],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then(users => res.status(200).send(users))
      .catch(err => res.status(404).send(err));
  },
};
