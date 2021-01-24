const router = require('express').Router();
const { validateUser, validateProfile, validateAvatar } = require('../middlewares/validation');
const { getUsers, getUser, getMe, createUser, updateProfile, updateAvatar } = require('../controllers/users.js');

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.get('/users/me', getMe);

router.post('/users', validateUser, createUser)


router.patch('/users/me', validateProfile, updateProfile);
router.patch('/users/me/avatar', validateAvatar, updateAvatar);



module.exports = router;
