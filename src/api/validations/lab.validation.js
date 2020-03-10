const Joi = require('joi');

module.exports = {
  // POST /v1/hospital
  createLab: {
    body: {
      name: Joi.string().required(),
      location: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      userName: Joi.string().required(),
    },
  },

  // GET /v1/lab
  listLabs: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      name: Joi.string(),
      location: Joi.string(),
    },
  },

};
