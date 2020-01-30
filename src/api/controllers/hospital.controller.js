const httpStatus = require('http-status');
const Hospital = require('../models/hospital.model');
const {createNewUser} = require('./user.controller');
const {responseHandler} = require('./general.controller');

/**
 * Create new hospital
 * @public
 */
exports.create = async (req, res, next) => {
    try {
      const {userName, email, password, role = "hospital", name, location } = req.body;
  
      const hospital = new Hospital({name, location});
      const savedHospital = await hospital.save();
      const payload = {name: userName,email,password,role, hospital:savedHospital._id}
      await createNewUser(payload);
      return responseHandler(res, httpStatus.CREATED, savedHospital)
    } catch (error) {
      return next(error);
    }
  };
