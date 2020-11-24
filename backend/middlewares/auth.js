/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { UnathorizedError } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (next) => {
  next(new UnathorizedError('Необходима авторизация'));
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(next);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'SUPEROPTEXT',
    );
  } catch (err) {
    return handleAuthError(next);
  }

  req.user = payload;

  next();
};
