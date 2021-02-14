const Card = require('../models/card.js');
const ErrorNotFound404 = require('../errors/ErrorNotFound404');
const ErrorForbidden403 = require('../errors/ErrorForbidden403');
const ErrorBadRequest400 = require('../errors/ErrorBadRequest400');


const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user.id;
  Card.create({ name, link, owner })
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
  Card.findById(req.params.id)
    .orFail(() => {
      throw new ErrorNotFound404('Карточка не найдена');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user.id) {
        throw new ErrorForbidden403('Чужую карточку невозможно удалить');
      }
      return Card.findByIdAndRemove(req.params.id);
    })
    .then((card) => {
      res.status(200).send("Карточка удалена")
    })
    .catch(next);

};

const updateLike = (req, res, next, method) => {
  Card.findByIdAndUpdate(req.params.id, { [method]: { likes: req.user.id } },
    { new: true })
    .orFail(() => {
      throw new ErrorNotFound404('Карточка не найдена');
    })
    .then((likes) => {
      res.status(201).send({ data: likes })
    })
    .catch(next);
}

const putLike = (req, res) => updateLike(req, res, next, '#addToSet');


const deleteLike = (req, res) => updateLike(req, res, next, '$pull');


module.exports = { getCards, getCard, createCard, deleteCard, putLike, deleteLike };
