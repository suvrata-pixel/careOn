const mongoose = require("mongoose");

const pharmacistProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    licenseNumber: { type: String, required: true },
    pharmacyName: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PharmacistProfile", pharmacistProfileSchema);
