const { error400, error404, error500 } = require('../errors/errorText');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const ErrorNotFound404 = require('../errors/ErrorNotFound404');
const ErrorForbidden403 = require('../errors/ErrorForbidden403');
const ErrorBadRequest400 = require('../errors/ErrorBadRequest400');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) =>
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new ErrorNotFound404('Нет пользователя с таким id');
      }
      res.status(200).send({ data: user })
    })
    .catch(next);

const getMe = (req, res, next) => {
  User.findOne(req.user._id)
    .then((user) => {
      if (!user) {
        throw new ErrorForbidden403('Доступ запрещен. Авторизуйтесь на сайте');
      }
      res.status(200).send({ data: user })
    })
    .catch(next);
};


const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 8)
    .then(hash => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      if (!user) {
        throw new ErrorBadRequest400('Проверьте правильность введенных данных');
      }
      res.status(201).send({ data: user })
    })
    .catch(next);

};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about },
    {
      new: true,
      runValidators: true,
    })

    .then((user) => {
      if (!user) {
        throw new ErrorBadRequest400('Проверьте правильность введенных данных');
      }
      res.status(201).send({ data: user })
    })
    .catch(next);

  // .then((user) => {
  //   if (err.name === 'ValidatorError') {
  //     throw new ErrorBadRequest400('Проверьте правильность введенных данных');
  //   }
  //   res.status(200).send({ data: user })
  // })
  // .catch(next);

};


const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar },
    {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      if (!user) {
        throw new ErrorBadRequest400('Проверьте правильность введенных данных');
      }
      res.status(201).send({ data: user })
    })
    .catch(next);
  // .then((user) => {
  //   if (err.name === 'ValidatorError') {
  //     throw new ErrorBadRequest400('Проверьте правильность введенных данных');
  //   }
  //   res.status(200).send({ data: user })
  // })
  // .catch(next);
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {

      const token = jwt.sign({ _id: user._id }, { expiresIn: '7d' });

      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports = { getUsers, getUser, getMe, createUser, updateProfile, updateAvatar, login };
