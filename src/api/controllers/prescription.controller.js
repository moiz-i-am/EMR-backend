const httpStatus = require('http-status');
const { responseHandler } = require('./general.controller');
const Prescription = require('../models/prescription.model');
// const Scheduling = require('../models/scheduling.model');
// const User = require('../models/user.model');

/**
 * Create new user
 * @public
 */
exports.createNewPrescription = async (data) => {
  try {
    const prescription = new Prescription(data);
    const savedPrescription = await prescription.save();
    return savedPrescription;
  } catch (error) {
    throw new Error(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      prescriptionText, date, patientId, doctorId, patientName, doctorName,
    } = req.body;

    const prescriptionData = {
      prescriptionText,
      date,
      patientId,
      doctorId,
      patientName,
      doctorName,
    };

    // code here

    const prescription = this.createNewPrescription(prescriptionData);
    return responseHandler(res, httpStatus.CREATED, prescription);
  } catch (error) {
    return next(error);
  }
};

/**
 * Get prescription list for patient
 * @public
 */
exports.listPatientPrescription = async (req, res, next) => {
  try {
    const { patientId } = req.body;

    const prescriptionData = {
      patientId,
    };
    const prescriptions = await Prescription.find({ patientId: prescriptionData.patientId });

    const transformedPrescription = prescriptions.map(prescription => prescription);
    res.json(transformedPrescription);
  } catch (error) {
    next(error);
  }
};

/**
 * Get prescription list for doctor
 * @public
 */
exports.listDoctorPrescription = async (req, res, next) => {
  try {
    const { doctorId } = req.body;

    const prescriptionData = {
      doctorId,
    };
    const prescriptions = await Prescription.find({ doctorId: prescriptionData.doctorId });

    const transformedPrescription = prescriptions.map(prescription => prescription);
    res.json(transformedPrescription);
  } catch (error) {
    next(error);
  }
};
