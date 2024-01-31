const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const userRout = require('./users');
const cardRout = require('./cards');
const { signInValid, signUpValid } = require('../utils/validation');

// реализуем роуты signin/signup
router.post('/signin', signInValid, login);

router.post('/signup', signUpValid, createUser);

// Защитите API авторизацией(все что ниже - роуты, которым авторизация нужна)
router.use(auth);
// реализуем роуты user/cards
router.use('/users', userRout);
router.use('/cards', cardRout);

// автотесты
router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
