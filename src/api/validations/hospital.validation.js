const Joi = require('joi');
const User = require('../models/hospital.model');

module.exports = {
    // POST /v1/hospital
  createHospital: {
    body: {
      name: Joi.string().required(),
      location: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      userName: Joi.string().required()
    }
  }
};