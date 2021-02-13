const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const errorUnauthorized401 = require('../errors/ErrorUnauthorized401');
const bearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new errorUnauthorized401('Проблема с токеном');
  }

  const token = bearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-dev-secret'}`);
  } catch (err) {
    throw new errorUnauthorized401('Необходима авторизация');
  }

  req.user = payload;

  next();
};
