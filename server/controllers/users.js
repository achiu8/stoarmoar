const { user, account, provider } = require('../models');
const { findById } = require('../services/user');

const current = (req, res) =>
  findById(req.userId)
    .then(user => res.send(user))
    .catch(err => res.status(401).send(err));

const list = (req, res) =>
  user.findAll({
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

module.exports = {
  current,
  list
};
