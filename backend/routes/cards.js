const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
    'content-type': 'application/json',
  }).unknown(true),
}), getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:,%_+.~#?&//=]*)/),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
    'content-type': 'application/json',
  }).unknown(true),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
    'content-type': 'application/json',
  }).unknown(true),
}), deleteCard);

router.put('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
    'content-type': 'application/json',
  }).unknown(true),
}), likeCard);

router.delete('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
    'content-type': 'application/json',
  }).unknown(true),
}), dislikeCard);

module.exports = router;
