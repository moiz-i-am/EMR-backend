const httpStatus = require('http-status');
const { responseHandler } = require('./general.controller');
const Booking = require('../models/booking.model');
const Scheduling = require('../models/scheduling.model');

/**
 * Create new user
 * @public
 */
exports.createNewBooking = async (data) => {
  try {
    const booking = new Booking(data);
    const savedBooking = await booking.save();
    return savedBooking;
  } catch (error) {
    throw new Error(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      timeSlot, date, patient, doctor,
    } = req.body;

    const bookingData = {
      timeSlot,
      date,
      patient,
      doctor,
    };
    // await Booking.find({
    //   doctor: bookingData.doctor, patient: bookingData.patient, timeSlot: bookingData.timeSlot, date: bookingData.date,
    // }, (err, data) => {
    //   if (err) {
    //     console.log(`MongoDB Error: ${err}`);
    //     return false; // or callback
    //   }
    //   if (data) {
    //     console.log(`Already exists ${err}`);
    //   } else {
    // for reserving time slot start
    const schedulingStart = Scheduling.updateOne(
      { user: bookingData.doctor, startDate: date, 'timeSlots.label': timeSlot },
      {
        $set:
          {
            'timeSlots.$.reserved': 'true',
          },
      },
    );

    schedulingStart.then(() => res.status(httpStatus.NO_CONTENT).end()).catch(e => next(e));

    const schedulingMiddle = Scheduling.updateOne(
      { user: bookingData.doctor, middleDates: date, 'timeSlots.label': timeSlot },
      {
        $set:
          {
            'timeSlots.$.reserved': 'true',
          },
      },
    );

    schedulingMiddle.then(() => res.status(httpStatus.NO_CONTENT).end()).catch(e => next(e));

    const schedulingEnd = Scheduling.updateOne(
      { user: bookingData.doctor, endDate: date, 'timeSlots.label': timeSlot },
      {
        $set:
          {
            'timeSlots.$.reserved': 'true',
          },
      },
    );

    schedulingEnd.then(() => res.status(httpStatus.NO_CONTENT).end()).catch(e => next(e));
    // for reserving time slot end
    // creating new booking
    const booking = this.createNewBooking(bookingData);
    return responseHandler(res, httpStatus.CREATED, booking);
    //   }
    // });
  } catch (error) {
    return next(error);
  }
};
