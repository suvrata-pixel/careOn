const express = require("express");
const router = express.Router();
const { bookAppointment, updateAppointmentStatus } = require("../controllers/appointmentController");
const { protect, authorize } = require("../middleware/auth");

router.post("/", protect, authorize("patient"), bookAppointment);
router.put("/:id/status", protect, authorize("doctor"), updateAppointmentStatus);

module.exports = router;
