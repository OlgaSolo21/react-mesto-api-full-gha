const router = require('express').Router();

const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const {
  postCreatCardValidate,
  fetchCardValidate,
} = require('../utils/validation');

router.get('/', getCards); // возвращает все карточки

router.post('/', postCreatCardValidate, createCard);

router.delete('/:cardId', fetchCardValidate, deleteCard);

router.put('/:cardId/likes', fetchCardValidate, likeCard);

router.delete('/:cardId/likes', fetchCardValidate, dislikeCard);

module.exports = router;
