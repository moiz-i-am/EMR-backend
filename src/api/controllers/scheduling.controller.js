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
  while (currentDate < stopDate) {
    dateArray.push(moment(currentDate));
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
}

exports.create = async (req, res, next) => {
  try {
    const { user } = req;
    const {
      timeSlots, startDate, endDate,
    } = req.body;

    const middleDates = getDates(startDate, endDate);

    const doctorData = {
      timeSlots,
      startDate,
      endDate,
      middleDates,
      user: user._id,
    };
    const today = new Date();
    if (startDate < today) {
      console.log('wrong date choosen');
    } else {
      await Scheduling.findOne({ $or: [{ user: user._id, startDate: doctorData.startDate, endDate: doctorData.endDate }, { user: user._id, startDate: doctorData.startDate }, { user: user._id, endDate: doctorData.endDate }] }, (err, data) => {
        if (err) {
          console.log(`MongoDB Error: ${err}`);
          return false; // or callback
        }
        if (data) {
          console.log(`Already exists ${err}`);
        } else {
          const scheduling = this.createNewScheduling(doctorData);
          return responseHandler(res, httpStatus.CREATED, scheduling);
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
    const scheduling = await Scheduling.find({ $or: [{ user: scheduleData.user, startDate: date }, { user: scheduleData.user, endDate: date }, { user: scheduleData.user, middleDates: date }] }).select({ 'timeSlots': 1, '_id': 0 });

    const transformedScheduling = scheduling.map(schedule => schedule);
    res.json(transformedScheduling);
  } catch (error) {
    next(error);
  }
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

  // const scheduling = Scheduling.update({ user: scheduleData.user, $unset: { startDate: date } });
  // const schedulingEnd = Scheduling.update({ user: scheduleData.user, $unset: { endDate: date } });
   const scheduling = Scheduling.update({ user: scheduleData.user, $pull: { middleDates: date } });


  scheduling
  .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));

};
