const mongoose = require("mongoose");

const labTechnicianProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    labSection: { type: String }, // e.g. "Pathology", "Radiology", "Blood Bank"
    shift: { type: String, enum: ["morning", "evening", "night"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LabTechnicianProfile", labTechnicianProfileSchema);
