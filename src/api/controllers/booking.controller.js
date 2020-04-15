const httpStatus = require('http-status');
const { responseHandler } = require('./general.controller');
const Booking = require('../models/booking.model');
const Scheduling = require('../models/scheduling.model');
const User = require('../models/user.model');

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
      { user: bookingData.doctor, date: bookingData.date, 'timeSlots.label': timeSlot },
      {
        $set:
          {
            'timeSlots.$.reserved': 'true',
          },
      },
    );

    schedulingStart.then(() => res.status(httpStatus.NO_CONTENT).end()).catch(e => next(e));

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


/**
 * Get bookings list of patient
 * @public
 */
exports.listPatientBookings = async (req, res, next) => {
  try {
    const { patient } = req.body;

    const bookingData = {
      patient,
    };
    const bookings = await Booking.find({ patient: bookingData.patient }).populate({ path: 'doctor', model: User });

    const transformedBooking = bookings.map(booking => booking);
    res.json(transformedBooking);
  } catch (error) {
    next(error);
  }
};

/**
 * Get bookings list of doctor
 * @public
 */
exports.listDoctorBookings = async (req, res, next) => {
  try {
    const { doctor } = req.body;

    const bookingData = {
      doctor,
    };
    const bookings = await Booking.find({ doctor: bookingData.doctor }).populate({ path: 'patient', model: User });

    const transformedBooking = bookings.map(booking => booking);
    res.json(transformedBooking);
  } catch (error) {
    next(error);
  }
};


/**
 * Delete user
 * @public
 */
exports.remove = (req, res, next) => {
  const { patient, doctor, date, timeSlot } = req.body;

  const bookingDeleteData = {
    patient,
    doctor,
    date,
    timeSlot,
  };

  const bookings = Booking.deleteOne({
    timeSlot: bookingDeleteData.timeSlot, date: bookingDeleteData.date, doctor: bookingDeleteData.doctor, patient: bookingDeleteData.patient,
  });

  // for reserving time slot start

  const schedulingStart = Scheduling.updateOne(
    { user: bookingDeleteData.doctor, date: bookingDeleteData.date, 'timeSlots.label': timeSlot },
    {
      $set:
        {
          'timeSlots.$.reserved': 'flase',
        },
    },
  );

  schedulingStart.then(() => res.status(httpStatus.NO_CONTENT).end()).catch(e => next(e));

  // for reserving time slot end

  bookings.then(() => res.status(httpStatus.NOT_FOUND).end())
    .catch(e => next(e));
};
