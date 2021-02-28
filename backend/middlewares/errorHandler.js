/* eslint-disable no-unused-vars */
const { CelebrateError } = require('celebrate');
const mongoose = require('mongoose');

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CelebrateError) {
    return res.status(400).send(err.details.get('body'));
  }
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    return res.status(404).send('Данные не прошли валидацию');
  }
  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }
  return res.status(500).send({ message: err.message });
};

// const errorHandler = (err, req, res, next) => {
//   console.log(err);
//   if (err instanceof CelebrateError) {
//     return res.status(400).send(err.details.get('body'));
//   }
//   if (err instanceof mongoose.mongo.MongoError) {
//     return res.status(400).send(err.details.get('body'));
//   }
//   if (err.status) {
//     return res.status(err.status).send({ message: err.message });
//   }
//   return res.status(500).send({ message: err.message });
// };

module.exports = errorHandler;
