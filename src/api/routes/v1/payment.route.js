const express = require('express');
const controller = require('../../controllers/payment.controller');

const router = express.Router();

router
  .route('/charge')
  .post(controller.chargePatient);

router
  .route('/paymentsList/:userId')
  .get(controller.getAllPaymentsForDoctor);

module.exports = router;
