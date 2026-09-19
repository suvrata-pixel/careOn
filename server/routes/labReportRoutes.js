const express = require("express");
const router = express.Router();
const { orderLabTest, updateLabReport } = require("../controllers/labReportController");
const { protect, authorize } = require("../middleware/auth");

router.post("/", protect, authorize("doctor"), orderLabTest);
router.put("/:id", protect, authorize("lab_technician"), updateLabReport);

module.exports = router;
