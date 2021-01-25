const Card = require('../models/card.js');
const ErrorNotFound404 = require('../errors/ErrorNotFound404');
const ErrorForbidden403 = require('../errors/ErrorForbidden403');
const ErrorBadRequest400 = require('../errors/ErrorBadRequest400');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
  .then((card) => {
    if (!card) {
      throw new ErrorBadRequest400('Проверьте правильность введенных данных');
    }
      res.status(201).send({ data: card })
  })
    .catch(next);

    // .then((card) => res.status(201).send({ data: card }))
    // .catch((err) => {
    //   if (err.name === 'ValidationError') {
    //     return res.status(400).send(error400);
    //   }
    //   return res.status(500).send(error500);
    // });
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(next);
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
  .then((card) => {
    if (!card) {
      throw new ErrorNotFound404('Карточка не найдена');
    }
      res.status(201).send({ data: card })
  })
    .catch(next);

    // .then((card) => {
    //   if (!card) {
    //     return res.status(404).send(error404);
    //   }
    //   return res.status(200).send({ data: card });
    // })
    // .catch((err) => {
    //   if (err.name === 'CastError') {
    //     return res.status(404).send(error404);
    //   }
    //   return res.status(500).send(error500);
    // });
};

const putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        throw new ErrorNotFound404('Карточка не найдена');
      }
        res.status(201).send({ data: card })
    })
      .catch(next);

    // .then((card) => {
    //   if (!card) {
    //     return res.status(404).send(error404);
    //   }
    //   return res.status(200).send({ data: card });
    // })
    // .catch((err) => {
    //   if (err.name === 'CastError') {
    //     return res.status(404).send(error404);
    //   }
    //   return res.status(500).send(error500);
    // });
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        throw new ErrorNotFound404('Карточка не найдена');
      }
        res.status(201).send({ data: card })
    })
      .catch(next);


    // .then((card) => {
    //   if (!card) {
    //     return res.status(404).send(error404);
    //   }
    //   return res.status(200).send({ data: card });
    // })
    // .catch((err) => {
    //   if (err.name === 'CastError') {
    //     return res.status(404).send(error404);
    //   }
    //   return res.status(500).send(error500);
    // });
};

module.exports = { getCards, createCard, deleteCard, putLike, deleteLike };
