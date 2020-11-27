const httpStatus = require("http-status");
const { responseHandler } = require("./general.controller");
const Booking = require("../models/booking.model");
const User = require("../models/user.model");

exports.listPatientsForLabReports = async (req, res, next) => {
  try {
    const { doctorId } = req.body;

    const bookingData = {
      doctorId,
    };
    const bookings = await Booking.find({
      doctor: bookingData.doctorId,
    }).populate({ path: "patient", model: User });

    const filteredBookings = bookings.filter(
      (booking, index, self) =>
        index === self.findIndex((t) => t.patient._id === booking.patient._id)
    );

    return responseHandler(res, httpStatus.CREATED, filteredBookings);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST);

    return res.jsonp({
      status: httpStatus.BAD_REQUEST,
      data: "Cannot get patients list",
    });
  }
};
