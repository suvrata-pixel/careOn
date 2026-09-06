const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    medicines: [
      {
        medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
        dosage: { type: String, required: true }, 
        durationDays: { type: Number, required: true },
      },
    ],
    notes: { type: String },
    dispensed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);
