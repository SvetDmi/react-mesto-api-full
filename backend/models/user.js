const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const regex = /^(https?:\/\/)(www\.)?([\w\-\.]+)\.([a-z]{2,6}\.?)(\/[\w\-\.]*)*\/?$/i;


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      // validator(v) {
      //   return regexLink.test(v)
      // },
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Не получается загрузить аватар, проверьте правильность ссылки',
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Проверьте правильность введения электронной почты',
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
    validate: {
      validator(v) {
        return validator.isStrongPassword(v);
      },
      message: 'Введите пароль минимум из 8 знаков, включащий в себя цифру, знак, большие и маленькие буквы'
    },
  },

});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};



module.exports = mongoose.model('user', userSchema);
