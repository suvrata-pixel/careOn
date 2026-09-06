const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    manufacturer: { type: String },
    stockQuantity: { type: Number, default: 0 },
    pricePerUnit: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medicine", medicineSchema);
