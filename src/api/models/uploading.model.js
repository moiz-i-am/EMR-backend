const mongoose = require('mongoose');

const UploadingSchema = new mongoose.Schema({
  imageURL: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Uploading', UploadingSchema);
