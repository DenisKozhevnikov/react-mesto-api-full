const { Schema, model } = require('mongoose');

const cardSchema = new Schema(
  {
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
          return /^https?:\/\/w{0,3}[.\-\w\d/]+#?/.test(v);
        },
        message: 'Ошибка валидации',
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = model('card', cardSchema);
