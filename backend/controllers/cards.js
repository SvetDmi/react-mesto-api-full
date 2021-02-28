const Card = require('../models/card.js');
const { ErrorBadRequest400, ErrorForbidden403, ErrorNotFound404 } = require('../errors/index');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user.id;
  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        throw new ErrorBadRequest400('Проверьте правильность введенных данных');
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

const getCards = (req, res, next) => {
  Card.find({}).sort('-createAt')
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const getCard = (req, res, next) => Card.findById(req.params.id)
  .then((card) => {
    if (!card) {
      throw new ErrorNotFound404('Карточка с таким id отсутствует');
    } return res.status(200).send(card);
  })
  .catch(next);

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user.id)) {
        throw new ErrorForbidden403('Чужую карточку невозможно удалить');
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

const updateLike = (req, res, next, method) => {
  Card.findByIdAndUpdate(req.params.id, { [method]: { likes: req.user.id } },
    { new: true })
    .then((card) => {
      if (!card) {
        throw new ErrorNotFound404('Карточка с таким id отсутствует');
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

const putLike = (req, res, next) => updateLike(req, res, next, '$addToSet');

const deleteLike = (req, res, next) => updateLike(req, res, next, '$pull');

module.exports = {
  getCards, getCard, createCard, deleteCard, putLike, deleteLike,
};
