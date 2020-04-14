const httpStatus = require('http-status');
const { responseHandler } = require('./general.controller');
const Scheduling = require('../models/scheduling.model');
const moment = require('moment-timezone');

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

function getDates(startDate, endDate) {
  const d = new Date(startDate);
  d.setDate(d.getDate() + 1);
  const newDate = d.toLocaleString();
  const dateArray = [];
  let currentDate = moment(newDate);
  const stopDate = moment(endDate);
  while (currentDate <= stopDate) {
    dateArray.push(moment(currentDate));
    currentDate = moment(currentDate).add(1, 'days');
  }
  const e = new Date(endDate);
  dateArray.push(moment(e.setDate(e.getDate() + 1)));
  return dateArray;
}

exports.create = async (req, res, next) => {
  try {
    const { user } = req;
    const {
      timeSlots, startDate, endDate,
    } = req.body;

    const middleDates = getDates(startDate, endDate);
    for (let i = 0; i < middleDates.length; i++) {
      const doctorData = {
        timeSlots,
        date: middleDates[i],
        user: user._id,
      };
      Scheduling.findOne({ user: user._id, date: doctorData.date }, (err, data) => {
        if (err) {
          console.log(`MongoDB Error: ${err}`);
          return false; // or callback
        }
        if (data) {
          console.log(`Already exists ${err}`);
        } else {
          Scheduling.insertMany(doctorData);
        }
      });
    }
  } catch (error) {
    return next(error);
  }
};

/**
 * Get Schedule list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const {
      user, date,
    } = req.body;

    const scheduleData = {
      user,
      date,
    };
    const scheduling = await Scheduling.find({ user: scheduleData.user, date: scheduleData.date }).select({ 'timeSlots': 1, '_id': 0 });

    const transformedScheduling = scheduling.map(schedule => schedule);
    res.json(transformedScheduling);
  } catch (error) {
    next(error);
  }
};

/**
 * Update schedule of specific date
 * @public
 */
exports.update = async (req, res, next) => {
  // const { user } = req;
  const { date, user, timeSlots } = req.body;

  const scheduleData = {
    user,
    date,
    timeSlots,
    startDate: date,
  };

  const scheduling = Scheduling.deleteOne({ user: scheduleData.user, date: scheduleData.date });

  scheduling.then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));

  // new to change user._id to user and remove error
  await Scheduling.findOne({ user: user._id, date: scheduleData.date }, (err, data) => {
    if (err) {
      console.log(`MongoDB Error: ${err}`);
      return false; // or callback
    }
    if (data) {
      console.log(`Already exists ${err}`);
    } else {
      const newScheduling = this.createNewScheduling(scheduleData);
      return responseHandler(res, httpStatus.CREATED, newScheduling);
    }
  });
};

/**
 * Delete schedule of specific date
 * @public
 */
exports.remove = (req, res, next) => {
  // const { user } = req;
  const { date, user } = req.body;

  const scheduleData = {
    user,
    date,
  };

  const scheduling = Scheduling.deleteOne({ user: scheduleData.user, date: scheduleData.date });

  scheduling.then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};

