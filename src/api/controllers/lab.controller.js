const httpStatus = require('http-status');
const Lab = require('../models/lab.model');
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
      userName, email, password, role = 'lab', name, location,
    } = req.body;
    const lab = new Lab({ name, location });
    const savedLab = await lab.save();
    const payload = {
      name: userName, email, password, role, lab: savedLab._id,
    };
    await createNewUser(payload);
    return responseHandler(res, httpStatus.CREATED, savedLab);
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
    const labs = await User.find({}).populate({ path: 'lab', model: Lab });

    const transformedLabs = labs.map((lab) => {
      if (lab.role === 'lab') {
        return lab;
      }
    });

    res.json(transformedLabs);
  } catch (error) {
    next(error);
  }
};
