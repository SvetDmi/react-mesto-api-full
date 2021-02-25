const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
// const jwtType = require('../config/config');
const { NODE_ENV, JWT_SECRET } = process.env;
const { ErrorBadRequest400, ErrorUnauthorized401, ErrorNotFound404, ErrorConflict409 } = require('../errors/index');

const getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      throw new ErrorNotFound404('Пользователи не найдены');
    })
    .then((users) => {
      return res.status(200).send(users);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new ErrorNotFound404('Нет такого пользователя');
    })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch(next);
};

const getMe = (req, res, next) => {
  User.findById(req.user.id)
    .orFail(() => {
      throw new ErrorNotFound404('Нет такого пользователя');
    })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch(next);
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
      res.status(200).send(user)
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
      res.status(200).send(user)
    })
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
    .then((password) => {
      return User.create({ name, about, avatar, email, password })
    })
    .then(({ _id, email }) => {
      res.send({ _id, email });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new ErrorUnauthorized401('Неправильный email или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((isValid) => {
          if (isValid) {
            return user;
          }
          throw new ErrorUnauthorized401('Неправильный email или пароль');
        })
    })

    .then((user) => {
      // const token = jwt.sign({ id: user._id }, jwtType, { expiresIn: '7d' });
      const token = jwt.sign({ id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports = { getUsers, getUser, getMe, createUser, updateProfile, updateAvatar, login };
