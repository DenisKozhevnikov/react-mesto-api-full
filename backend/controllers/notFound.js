const { NotFoundError } = require('../errors');

const notFound = (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
};

module.exports = notFound;
