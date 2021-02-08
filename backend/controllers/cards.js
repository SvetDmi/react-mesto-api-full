const Card = require('../models/card.js');
const ErrorNotFound404 = require('../errors/ErrorNotFound404');
const ErrorForbidden403 = require('../errors/ErrorForbidden403');
const ErrorBadRequest400 = require('../errors/ErrorBadRequest400');


const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((newCard) => res.send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest400('Ошибка валидации. Введены некорректные данные'));
      }
      next(err);
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch(next);
};

const getCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => {
      throw new ErrorNotFound404('Карточка не найдена');
    })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch(next);
};


const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => {
      throw new ErrorNotFound404('Карточка не найдена');
    })
    .then((card) => {
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        throw new ErrorForbidden403('Чужую карточку невозможно удалить');
      }
    })
    .then(() => {
      res.status(200).send('Карточка удалена')
    })
    .catch(next);

};

const updateLike = (req, res, method) => {
  Card.findByIdAndUpdate(req.params.id, { [method]: { likes: req.user._id } },
    { new: true })
    .orFail(() => {
      throw new ErrorNotFound404('Карточка не найдена');
    })
    .then((card) => {
      res.status(201).send({ data: card })
    })
    .catch(next);
}

const putLike = (req, res) => updateLike(req, res, '#addToSet');


const deleteLike = (req, res) => updateLike(req, res, '$pull');


module.exports = { getCards, getCard, createCard, deleteCard, putLike, deleteLike };
