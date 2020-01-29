const httpStatus = require('http-status');
const Hospital = require('../models/hospital.model');
const User = require('../models/user.model');

/**
 * Create new hospital
 * @public
 */
exports.create = async (req, res, next) => {
    try {
      const {userName, email, password, role = "hospital", name, location } = req.body;
  
      const hospital = new Hospital({name, location});
      const savedHospital = await hospital.save();

      const user = new User({name: userName,email,password,role, hospital:savedHospital._id});
      await user.save();

      res.status(httpStatus.CREATED);
     res.json();
    } catch (error) {
      next(User.checkDuplicateEmail(error));
    }
  };