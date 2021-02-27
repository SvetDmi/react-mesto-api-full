const jwt = require('jsonwebtoken');
const { ErrorUnauthorized401 } = require('../errors/index');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization && !authorization.startsWith('Bearer ')) {
    throw new ErrorUnauthorized401('Необходим токен для авторизации');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new ErrorUnauthorized401('Необходим токен для авторизации');
  }

  req.user = payload;

  next();
};
