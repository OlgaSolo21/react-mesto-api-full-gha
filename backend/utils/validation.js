const { celebrate, Joi } = require('celebrate');

const urlRegex = /^(https?:\/\/(www\.)?([a-zA-z0-9-]){1,}\.?([a-zA-z0-9]){2,8}(\/?([a-zA-z0-9-])*\/?)*\/?([-._~:/?#[]@!\$&'\(\)\*\+,;=])*)/;

module.exports.signInValid = celebrate({ // вход логин
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.signUpValid = celebrate({ // регистрация
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.getUserIdValidate = celebrate({ // получение данных пользователя
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.patchUpdateUserValidate = celebrate({ // изменение данных профиля имя и о себе
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.patchUpdateAvatarValidate = celebrate({ // изменение аватара
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlRegex),
  }),
});

module.exports.postCreatCardValidate = celebrate({ // добавление новой карточки
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegex),
  }),
});

module.exports.fetchCardValidate = celebrate({ // удаление карточки, постановка/снятие лайка
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});
