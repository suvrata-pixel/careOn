const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true }, // e.g. "10:00"
    endTime: { type: String, required: true },   // e.g. "10:30"
    isBooked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
