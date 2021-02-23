const jwt = require('jsonwebtoken');
const { ErrorUnauthorized401 } = require('../errors/index');
const jwtType = require('../config/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization && !authorization.startsWith('Bearer ')) {
    throw new ErrorUnauthorized401('Необходим токен для авторизации');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, jwtType);
  } catch (err) {
    throw new ErrorUnauthorized401('Необходим токен для авторизации');
  }

  req.user = payload;

  next();
};


