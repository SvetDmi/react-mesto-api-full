const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const auth = require('./middlewares/auth')

const { error404 } = require('./errors/errorText');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users.js');
// const { validateUser } = require('../middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

// app.post('/signin', validateUser, login);
// app.post('/signup', validateUser, createUser);


// app.use('/', auth, usersRouter);
// app.use('/', auth, cardsRouter);

app.use('/', usersRouter);
app.use('/', cardsRouter);

// app.use((req, res, next) => {
//   req.user = {
//     _id: '5fda5183e8f27d1c5c7a7635',
//   };

//   next();
// });

app.use('*', (req, res) => res.status(404).send(error404));
app.use(errorLogger); 
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
