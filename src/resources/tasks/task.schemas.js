const Joi = require('joi');

const schemas = {
  post: Joi.object().keys({
    title: Joi.string().required(),
    order: Joi.number(),
    description: Joi.string(),
    userId: Joi.string().allow(null),
    boardId: Joi.string().allow(null),
    columnId: Joi.string().allow(null)
  }),
  put: Joi.object().keys({
    id: Joi.string().required(),
    title: Joi.string(),
    order: Joi.number(),
    description: Joi.string(),
    userId: Joi.string().allow(null),
    boardId: Joi.string().allow(null),
    columnId: Joi.string().allow(null)
  })
};

module.exports = schemas;
