require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const auth = require('./middlewares/auth');
const userAuth = require('./routes/userAuth.js');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
// const { PORT = 3002 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //
  max: 100 //
});
app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', userAuth);
app.use('/', auth, usersRouter);
app.use('/', auth, cardsRouter);

app.use('/', (req, res, next) => {
  const error = new Error('Запрашиваемый ресурс не найден');
  error.statusCode = 404;
  next(error);
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log(message, err);
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
