const express = require("express");
const router = express.Router();
const { createPrescription, dispensePrescription } = require("../controllers/prescriptionController");
const { protect, authorize } = require("../middleware/auth");

router.post("/", protect, authorize("doctor"), createPrescription);
router.put("/:id/dispense", protect, authorize("pharmacist"), dispensePrescription);

module.exports = router;
