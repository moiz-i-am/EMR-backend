const { validationResult } = require('express-validator');
const Payment = require('../models/payment.model');
const { StripeSecretkey } = require('../../config/vars');

const stripe = require('stripe')(StripeSecretkey);

exports.chargePatient = async (req, res, next) => {
  const {
    id, amount, doctorId, patientId, patientName, doctorName,
  } = req.body;
  try {
    const paymentIntent = stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      description: `Appointment booked patient name: ${patientName}, doctor name: ${doctorName}`,
      payment_method: id,
      confirm: true,
    });

    console.log(paymentIntent);

    // const customer = await stripe.customers.create({
    //   name: 'Muhammad Moiz Tahir',
    //   email: 'moizchaudhary35@gmail.com',
    //   description: 'My second Test Customer (created for API docs)',
    // });

    // console.log(customer);

    // saving to DB end
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }

    if (!id) {
      const error = new Error('No paymentId Provided.');
      error.statusCode = 422;
      throw error;
    }

    const payment = new Payment({
      paymentId: id,
      amount,
      doctor: doctorId,
      patient: patientId,
    });

    payment
      .save()
      .then((result) => {
        res.status(201).json({
          message: 'Payment created successfully!',
          post: result,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
    // saving to DB end

    return res.status(200).json({
      confirm: 'abc123',
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: 'did not work',
    });
  }
};
