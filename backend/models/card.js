const mongoose = require('mongoose');
const regex = /^(https?:\/\/)(www\.)?([\w\-\.]+)\.([a-z]{2,6}\.?)(\/[\w\-\.]*)*\/?$/i;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return regexLink.test(v);
      },
      message: 'Не получается загрузить карточку, проверьте правильность ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
