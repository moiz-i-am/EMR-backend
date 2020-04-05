const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  timeSlot: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    default: '',
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = mongoose.model('Booking', BookingSchema);
