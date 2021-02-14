const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const { NODE_ENV, JWT_SECRET } = process.env;
const ErrorNotFound404 = require('../errors/ErrorNotFound404');
const ErrorForbidden403 = require('../errors/ErrorForbidden403');
const ErrorBadRequest400 = require('../errors/ErrorBadRequest400');
const ErrorConflict409 = require('../errors/ErrorConflict409');

const getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      throw new ErrorNotFound404('Пользователи не найдены');
    })
    .then((users) => res.status(200).send({ users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new ErrorNotFound404('Нет такого пользователя');
    })
    .then((user) => res.status(200).send({ user }))
    .catch(next);
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new ErrorNotFound404('Нет такого пользователя');
    })
    .then((user) => res.status(200).send({ user }))
    .catch(next);
};


const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ErrorConflict409('Уже есть такой email');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      User.create({ name, about, avatar, email, password: hash })
        .then(({ _id }) => {
          res.status(201).send({
            _id, name, about, avatar, email
          });
        })
        .catch(next);
    })
};


const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user.id, { name, about },
    {
      new: true,
      runValidators: true,
    })
    .orFail(() => {
      throw new ErrorNotFound404('Нет такого пользователя');
    })

    .then((user) => {
      if (!user) {
        throw new ErrorBadRequest400('Проверьте правильность введенных данных');
      }
      res.status(201).send({ data: user })
    })
    .catch(next);
};


const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user.id, { avatar },
    {
      new: true,
      runValidators: true,
    })
    .orFail(() => {
      throw new ErrorNotFound404('Нет такого пользователя');
    })
    .then((user) => {
      if (!user) {
        throw new ErrorBadRequest400('Проверьте правильность введенных данных');
      }
      res.status(201).send({ data: user })
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports = { getUsers, getUser, getMe, createUser, updateProfile, updateAvatar, login };
