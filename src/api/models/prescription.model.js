const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
  prescriptionText: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default: '',
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  doctorName: {
    type: String,
    default: '',
  },
  patientName: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);
