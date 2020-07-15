const mongoose = require('mongoose');

const UploadingFileSchema = new mongoose.Schema({
  fileURL: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  labId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lab',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('UploadingFile', UploadingFileSchema);
