const Joi = require('joi');

const schemas = {
  post: Joi.object().keys({
    title: Joi.string().required(),
    columns: Joi.array().items(
      Joi.object().keys({
        title: Joi.string().required(),
        order: Joi.number()
      })
    )
  }),
  put: Joi.object().keys({
    id: Joi.string().required(),
    title: Joi.string(),
    columns: Joi.array().items(
      Joi.object().keys({
        id: Joi.string(),
        title: Joi.string(),
        order: Joi.number()
      })
    )
  })
};

module.exports = schemas;
