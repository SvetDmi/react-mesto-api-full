const router = require('express').Router();

const { login, createUser } = require('../controllers/users');
const { validateUser } = require('../middlewares/validation');


router.post('/signin', validateUser, login);
router.post('/signup', validateUser, createUser);

module.exports = router;