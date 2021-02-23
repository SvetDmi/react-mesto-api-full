const { NODE_ENV, JWT_SECRET } = process.env;
const jwtType = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports = jwtType;