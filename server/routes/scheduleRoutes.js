const express = require("express");
const router = express.Router();
const { createSchedule, getAvailableSchedules } = require("../controllers/scheduleController");
const { protect, authorize } = require("../middleware/auth");

router.post("/", protect, authorize("doctor"), createSchedule);
router.get("/", protect, getAvailableSchedules);

module.exports = router;
