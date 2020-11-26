const httpStatus = require("http-status");
const { responseHandler } = require("./general.controller");
const Feedback = require("../models/feedback.model");
const User = require("../models/user.model");

exports.createFeedback = async (req, res, next) => {
  try {
    const { patientName, comment, doctorId } = req.body;

    const feetBackData = {
      patientName,
      comment,
      date: new Date(),
      doctorId,
    };

    const feedback = new Feedback(feetBackData);
    const savedFeedback = await feedback.save();

    return responseHandler(res, httpStatus.CREATED, savedFeedback);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST);

    return res.jsonp({
      status: httpStatus.BAD_REQUEST,
      data: "Cannot save feedback",
    });
  }
};

exports.getAllFeedbacksByDoctorId = async (req, res, next) => {
  try {
    const { doctorId } = req.body;

    const feedbacksSearch = await Feedback.find({ doctorId });

    console.log(feedbacksSearch);
    return responseHandler(res, httpStatus.OK, feedbacksSearch);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST);

    return res.jsonp({
      status: httpStatus.BAD_REQUEST,
      data: "Cannot get feedbacks",
    });
  }
};
