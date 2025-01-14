const Broadcast = require('../../models/Broadcast');
const to = require('await-to-js').default;
const constants = require('../../../constants');
const { ErrorHandler } = require('../../../helpers/error');

module.exports = async (req, res, next) => {
  const [err, response] = await to(Broadcast.find());
  if (err) {
    const error = new ErrorHandler(constants.ERRORS.DATABASE, {
      statusCode: 500,
      message: 'Mongo Error: Fetching Failed',
      errStack: err,
    });
    return next(error);
  }

  res.status(200).json(response);
  next();
};
