const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/feedback.controller");
const { authorize, ADMIN, LOGGED_USER } = require("../../middlewares/auth");

const router = express.Router();

router.route("/").post(controller.createFeedback);

router.route("/doctor").post(controller.getAllFeedbacksByDoctorId);

module.exports = router;
