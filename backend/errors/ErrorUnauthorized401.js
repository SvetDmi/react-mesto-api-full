class errorUnauthorized401 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = errorUnauthorized401;