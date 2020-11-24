const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
    'content-type': 'application/json',
  }).unknown(true),
}), getUsers);

router.get('/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
    'content-type': 'application/json',
  }).unknown(true),
}), getCurrentUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
    'content-type': 'application/json',
  }).unknown(true),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
    'content-type': 'application/json',
  }).unknown(true),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
    'content-type': 'application/json',
  }).unknown(true),
}), updateAvatar);

module.exports = router;
