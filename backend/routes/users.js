const router = require('express').Router();
const { validateProfile, validateAvatar, validateId } = require('../middlewares/validation');
const {
  getUsers, getUser, getMe, updateProfile, updateAvatar,
} = require('../controllers/users.js');

router.get('/users/me', getMe);
router.get('/users/:id', validateId, getUser);
router.get('/users', getUsers);

// router.get('/users/:id', (req, res) => {
//   if (req.params.id === 'me') {
//     return getMe(req, res);
//   }
//   return getUser(req, res);
// });

router.patch('/users/me', validateProfile, updateProfile);

router.patch('/users/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
