const { verifyToken } = require('../utils/auth');

module.exports = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.split(' ')[1];

  verifyToken(token, (err, payload) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    req.userId = payload.id;

    next();
  });
};
