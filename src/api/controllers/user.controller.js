const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../models/user.model');
const { responseHandler } = require('./general.controller');
const emailProvider = require('../services/emails/emailProvider');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const user = await User.get(id);
    req.locals = { user };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get user
 * @public
 */
exports.get = (req, res) => res.json(req.locals.user.transform());

/**
 * Get user data by socket Id
 * @public
 */
exports.getUserBySocket = async (req, res, next) => {
  try {
    const { socketId } = req.body;

    // const userData = {
    //   socketId,
    // };
    const data = await User.find({ socketHandler: socketId });
    res.json(data);
  } catch (error) {
    next(error);
  }
};


/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = (req, res) => res.json(req.user.transform());

/**
 * Create new user
 * @public
 */
exports.createNewUser = async (data) => {
  try {
    const user = new User(data);
    const savedUser = await user.save();
    return savedUser.transform();
  } catch (error) {
    throw new Error(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      name, email, password, role = 'patient', timeSlots, dateRange,
    } = req.body;
    let patientData = {
      name,
      email,
      password,
      role,
      timeSlots,
      dateRange,
    };
    const user = await this.createNewUser(patientData);
    // sending confirmation email
    const customer = await User.findOne({ email: email }).exec();
    // user.password = password;
    await customer.save();
    emailProvider.sendSignupEmail(customer);

    return responseHandler(res, httpStatus.CREATED, user);
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Replace existing user
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { user } = req.locals;
    const newUser = new User(req.body);
    const ommitRole = user.role !== 'admin' ? 'role' : '';
    const newUserObject = omit(newUser.toObject(), '_id', ommitRole);

    await user.updateOne(newUserObject, { override: true, upsert: true });
    const savedUser = await User.findById(user._id);

    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Update existing user
 * @public
 */
exports.update = (req, res, next) => {
  const ommitRole = req.locals.user.role !== 'admin' ? 'role' : '';
  const updatedUser = omit(req.body, ommitRole);
  const user = Object.assign(req.locals.user, updatedUser);

  user.save()
    .then(savedUser => res.json(savedUser.transform()))
    .catch(e => next(User.checkDuplicateEmail(e)));
};

/**
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const users = await User.list(req.query);
    const transformedUsers = users.map(user => user.transform());
    res.json(transformedUsers);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 * @public
 */
exports.remove = (req, res, next) => {
  const { user } = req.locals;

  user.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};
