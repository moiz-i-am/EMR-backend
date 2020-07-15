const mongoose = require('mongoose');

const UploadingDocsSchema = new mongoose.Schema({
  docURL: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lab',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('UploadingDocs', UploadingDocsSchema);
