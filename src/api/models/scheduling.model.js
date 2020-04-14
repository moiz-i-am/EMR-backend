const mongoose = require('mongoose');

const SchedulingSchema = new mongoose.Schema({
  timeSlots: {
    type: Array,
    default: [],
  },
  // middleDates: [{
  //   type: Date,
  //   default: [],
  // }],
  // startDate: {
  //   type: Date,
  //   default: '',
  // },
  // endDate: {
  //   type: Date,
  //   default: '',
  // },
  date: {
    type: Date,
    default: '',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = mongoose.model('Scheduling', SchedulingSchema);
