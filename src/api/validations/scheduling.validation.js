const Joi = require('joi');

module.exports = {
  // GET /v1/hospital
  listSchedules: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      timeSlots: Joi.array(),
    },
  },
};
