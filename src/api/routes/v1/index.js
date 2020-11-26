const express = require("express");
const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
const hospitalRoutes = require("./hospital.route");
const labRoutes = require("./lab.route");
const schedulingRoutes = require("./scheduling.route");
const bookingRoutes = require("./booking.route");
const prescriptionRoutes = require("./prescription.route");
const uploadingRoutes = require("./uploading.route");
const paymentRoutes = require("./payment.route");
const feedbackRoutes = require("./feedback.route");

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req, res) => res.send("OK"));

/**
 * GET v1/docs
 */
router.use("/docs", express.static("docs"));

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/hospital", hospitalRoutes);
router.use("/lab", labRoutes);
router.use("/scheduling", schedulingRoutes);
router.use("/booking", bookingRoutes);
router.use("/prescription", prescriptionRoutes);
router.use("/uploading", uploadingRoutes);
router.use("/payment", paymentRoutes);
router.use("/feedback", feedbackRoutes);

module.exports = router;
