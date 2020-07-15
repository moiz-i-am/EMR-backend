const httpStatus = require('http-status');
const Hospital = require('../models/hospital.model');
const User = require('../models/user.model');
const { createNewUser } = require('./user.controller');
const { responseHandler } = require('./general.controller');

/**
 * Create new hospital
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const {
      userName, email, password, role = 'hospital', name, location,
    } = req.body;

    const hospital = new Hospital({ name, location });
    const savedHospital = await hospital.save();
    const payload = {
      name: userName, email, password, role, hospital: savedHospital._id,
    };
    await createNewUser(payload);
    return responseHandler(res, httpStatus.CREATED, savedHospital);
  } catch (error) {
    return next(error);
  }
};

/**
 * Get hispital list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const hospitals = await User.find({}).populate({ path: 'hospital', model: Hospital });

    const transformedHospitals = hospitals.map((hospital) => {
      if (hospital.role === 'hospital') {
        return hospital;
      }
    });
    res.json(transformedHospitals);
  } catch (error) {
    next(error);
  }
};
