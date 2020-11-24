/* eslint-disable func-names */
const { Schema, model } = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const { UnathorizedError } = require('../errors');

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      validate: {
        validator(v) {
          return /^https?:\/\/w{0,3}[.\-\w\d/]+#?/.test(v);
        },
        message: 'Ошибка валидации, введите корректный url картинки',
      },
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      unique: true,
      required: true,
      minlength: 2,
      maxlength: 40,
      validate: {
        validator: (v) => isEmail(v),
        message: 'Неправильный формат почты',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnathorizedError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnathorizedError('Неправильные почта или пароль'));
          }
          // Тут уже пароль и почта проверены
          return user;
        });
    });
};

module.exports = model('user', userSchema);
