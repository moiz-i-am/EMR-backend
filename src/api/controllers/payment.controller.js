const { validationResult } = require('express-validator');
const Payment = require('../models/payment.model');

const stripe = require('stripe')('sk_test_51H3Pk4I5sVsTj98eKwZs95w0lx2cCmITCevmsxcNMl9Z4WkHLBYrXkTHIcRJ21gtbHbjlHNVOGHHH8wG4tkLDWfu00RpD6Dk6c');

exports.chargePatient = async (req, res, next) => {
  const {
    id, amount, doctorId, doctorName, patientId, patientName
  } = req.body;
  try {
    const paymentIntent = stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      description: 'Delicious pizza',
      // Verify your integration in this guide by including this parameter
      // metadata: { integration_check: 'accept_a_payment' },
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


exports.accountSetup = async (req, res, next) => {

  // const country = req.body.countryCode;
  // const email = 'moizchaudhary35@gmial.com';

  // if (
  //   country !== 'CA' &&
  //   country !== 'US'
  // ) {
  //   res.send({
  //     success: 'false',
  //     message: 'Error: Invalid country',
  //   });
  // } else {
  //   stripe.accounts.create(
  //     {
  //       type: 'custom',
  //       country,
  //       email,
  //       requested_capabilities: [
  //         'card_payments',
  //         'transfers',
  //       ],
  //     },
  //     (err, account) => {
  //       if (err) {
  //         res.send({
  //           success: 'false',
  //           message: `Error: ${err.message}`,
  //         });
  //       } else {
  //         console.log('account', account);

  //         const { id } = account;

  //         stripe.accounts.update(
  //           id,
  //           {
  //             tos_acceptance: {
  //               date: Math.floor(Date.now() / 1000),
  //               ip: req.ip,
  //             },
  //           },
  //         ).then(() => {
  //           res.send({
  //             success: true,
  //             message: 'Account setup has begin.',
  //             accountId: id,
  //           });
  //         });
  //       }
  //     },
  //   );
  // }
};
