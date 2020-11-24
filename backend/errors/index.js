const BadRequestError = require('./badRequestErr');
const ForbiddenError = require('./forbiddenErr');
const NotFoundError = require('./notFoundErr');
const UnathorizedError = require('./unauthorized');

module.exports = {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnathorizedError,
};
