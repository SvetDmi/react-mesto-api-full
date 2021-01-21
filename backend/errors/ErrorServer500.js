class errorServer500 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = errorServer500;