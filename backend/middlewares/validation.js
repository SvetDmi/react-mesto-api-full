const { celebrate, Joi } = require('celebrate');

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }).unknown(true),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^(https?:\/\/)(www\.)?([\w\-\.]+)\.([a-z]{2,6}\.?)(\/[\w\-\.]*)*\/?$/i),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^(https?:\/\/)(www\.)?([\w\-\.]+)\.([a-z]{2,6}\.?)(\/[\w\-\.]*)*\/?$/i),
  })
});

const validateId = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  })
});



module.exports = { validateUser, validateProfile, validateAvatar, validateCard, validateId };