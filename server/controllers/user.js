const User = require('../models').User;

module.exports = {
  list(req, res) {
    return User
      .findAll({
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then(users => res.status(200).send(users))
      .catch(err => { res.status(404).send(err); });
  },
};
