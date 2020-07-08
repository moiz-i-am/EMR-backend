const mongoose = require('mongoose');

const UploadingSchema = new mongoose.Schema({
  fileURL: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  // lab: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'lab',
  // },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Uploading', UploadingSchema);
