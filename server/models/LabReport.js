const mongoose = require("mongoose");

const labReportSchema = new mongoose.Schema(
  {
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    labTechnicianId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    testName: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    resultSummary: { type: String },
    reportFileUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LabReport", labReportSchema);
