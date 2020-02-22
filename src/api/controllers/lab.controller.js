const httpStatus = require('http-status');
const Lab = require('../models/lab.model');
const {createNewUser} = require('./user.controller');
const {responseHandler} = require('./general.controller');

/**
 * Create new hospital
 * @public
 */
exports.create = async (req, res, next) => {
    try {
      const {userName, email, password, role = "lab", name, location } = req.body;
      const lab = new Lab({name, location});
      const savedLab = await lab.save();
      const payload = {name: userName,email,password,role, lab:savedLab._id}
      await createNewUser(payload);
      return responseHandler(res, httpStatus.CREATED, savedLab)
    } catch (error) {
      return next(error);
    }
    
  };