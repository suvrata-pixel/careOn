const mongoose = require("mongoose");

const patientProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    age: { type: Number },
    gender: { type: String, enum: ["male", "female", "other"] },
    phone: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PatientProfile", patientProfileSchema);
