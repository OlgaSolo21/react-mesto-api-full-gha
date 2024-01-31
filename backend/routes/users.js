const router = require('express').Router();

const {
  getUsers, getUsersId, updateUserProfile, updateAvatar, getUserMe,
} = require('../controllers/users');
const {
  getUserIdValidate,
  patchUpdateUserValidate,
  patchUpdateAvatarValidate,
} = require('../utils/validation');

router.get('/', getUsers);
router.get('/me', getUserMe);

router.get('/:userId', getUserIdValidate, getUsersId);

router.patch('/me', patchUpdateUserValidate, updateUserProfile);

router.patch('/me/avatar', patchUpdateAvatarValidate, updateAvatar);

module.exports = router;
