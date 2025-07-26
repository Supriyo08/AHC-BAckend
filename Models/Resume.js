const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  qualification: String,
  profile: String,
  designation: String,
  resumeUrl: String,
}, { timestamps: true });

module.exports = mongoose.model("Resume", resumeSchema);
