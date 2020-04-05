const Joi = require('joi');
const { ErrorHandler } = require('./error');

const validateJoi = schema => {
  return (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      const err = new ErrorHandler(400, 'Invalid request body');
      // eslint-disable-next-line callback-return
      next(err);
    }
    next();
  };
};

const validateUuid = () => {
  return (req, res, next) => {
    const re = new RegExp(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/,
      'i'
    );
    const params = ['id', 'boardId', 'taskId'];
    params.forEach(elem => {
      if (req.params[elem]) {
        const result = re.test(req.params[elem]);
        if (!result) {
          const err = new ErrorHandler(400, 'The ID string is not a UUID');
          // eslint-disable-next-line callback-return
          next(err);
        }
      }
    });
    next();
  };
};

module.exports = { validateJoi, validateUuid };
