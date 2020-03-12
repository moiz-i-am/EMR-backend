const httpStatus = require('http-status');
const User = require('../models/user.model');
const { responseHandler } = require('./general.controller');
const Scheduling = require('../models/scheduling.model');

/**
 * Create new user
 * @public
 */
exports.createNewScheduling = async (data) => {
  try {
    const scheduling = new Scheduling(data);
    const savedScheduling = await scheduling.save();
    return savedScheduling;
  } catch (error) {
    throw new Error(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { user } = req;
    console.log(user._id);
    const {
      timeSlots, startDate, endDate,
    } = req.body;
    console.log(timeSlots);
    const doctorData = {
      timeSlots,
      startDate,
      endDate,
      user: user._id,
    };
    const scheduling = await this.createNewScheduling(doctorData);
    return responseHandler(res, httpStatus.CREATED, scheduling);
  } catch (error) {
    return next(error);
  }
};
