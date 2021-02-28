const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Невалидный email');
    }),
    password: Joi.string().required().min(8).messages({
      'string-min': 'Минимум 8 символа',
      'any.required': 'Обязательное поле',
    }),
  }).unknown(true),
});

const validateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string-min': 'Минимум 2 символа',
      'string-max': 'Максимум 30 символов',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string-min': 'Минимум 2 символа',
      'string-max': 'Максимум 30 символов',
    }),
  }).unknown(true),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Невалидный URL');
    }),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string-min': 'Минимум 2 символа',
        'string-max': 'Максимум 30 символов',
      }),
    link: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Невалидный URL');
    }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24)
      .custom((id, helper) => {
        if (validator.isAlphanumeric(id)) {
          return id;
        }
        return helper.message('Невалидный Id');
      }),
  }),
});

module.exports = {
  validateUser, validateProfile, validateAvatar, validateCard, validateId,
};
