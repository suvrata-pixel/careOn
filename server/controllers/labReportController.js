const LabReport = require("../models/LabReport");
const Appointment = require("../models/Appointment");

exports.orderLabTest = async (req, res) => {
  try {
    const { appointmentId, testName } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.doctorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only order tests for your own appointments" });
    }

    const labReport = await LabReport.create({
      appointmentId,
      doctorId: req.user.id,
      patientId: appointment.patientId,
      testName,
    });

    res.status(201).json(labReport);
  } catch (err) {
    res.status(500).json({ message: "Failed to order lab test", error: err.message });
  }
};


exports.updateLabReport = async (req, res) => {
  try {
    const { status, resultSummary } = req.body;
    const validStatuses = ["in_progress", "completed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const labReport = await LabReport.findById(req.params.id);
    if (!labReport) {
      return res.status(404).json({ message: "Lab report not found" });
    }

    labReport.status = status;
    labReport.labTechnicianId = req.user.id;
    if (resultSummary) labReport.resultSummary = resultSummary;

    await labReport.save();

    res.status(200).json(labReport);
  } catch (err) {
    res.status(500).json({ message: "Failed to update lab report", error: err.message });
  }
};
