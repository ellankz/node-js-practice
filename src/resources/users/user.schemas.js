const Joi = require('joi');

const schemas = {
  post: Joi.object().keys({
    name: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().required()
  }),
  put: Joi.object().keys({
    id: Joi.string(),
    name: Joi.string(),
    login: Joi.string(),
    password: Joi.string()
  })
};

module.exports = schemas;
