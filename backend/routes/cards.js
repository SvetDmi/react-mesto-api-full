const router = require('express').Router();
const { validateCard, validateId } = require('../middlewares/validation');
const { getCards, getCard, createCard, deleteCard, putLike, deleteLike } = require('../controllers/cards.js');

router.get('/cards', getCards);
router.get('/cards/:id', getCard);
router.post('/cards', validateCard, createCard);
router.delete('/cards/:id', validateId, deleteCard);
router.put('cards/:id/likes', validateId, putLike);
router.delete('cards/:id/likes', validateId, deleteLike);

module.exports = router;
