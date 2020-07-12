const express = require('express');
const controller = require('../../controllers/payment.controller');

const router = express.Router();

router
  .route('/charge')
  .post(controller.chargePatient);

module.exports = router;
