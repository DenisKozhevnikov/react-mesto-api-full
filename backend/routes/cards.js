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
    link: Joi.string().required().uri(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
    'content-type': 'application/json',
  }).unknown(true),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
    'content-type': 'application/json',
  }).unknown(true),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
    'content-type': 'application/json',
  }).unknown(true),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().length(179),
    'content-type': 'application/json',
  }).unknown(true),
}), dislikeCard);

module.exports = router;
