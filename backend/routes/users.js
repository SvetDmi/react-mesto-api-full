const router = require('express').Router();
const { validateUser, validateProfile, validateAvatar } = require('../middlewares/validation');
const { getUsers, getUser, getMe, updateProfile, updateAvatar } = require('../controllers/users.js');

router.get('/users', getUsers);

router.get('/users/:id', validateUser, function (req, res) {
  if (req.params.id === 'me') {
    return getMe(req, res);
  } else {
    return getUser(req, res);
  }
});

router.patch('/users/me', validateProfile, updateProfile);

router.patch('/users/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
