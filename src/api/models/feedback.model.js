const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  patientName: {
    type: String,
    default: "",
  },
  comment: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: "",
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
