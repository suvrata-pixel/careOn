const Prescription = require("../models/Prescription");
const Appointment = require("../models/Appointment");

exports.createPrescription = async (req, res) => {
  try {
    const { appointmentId, medicines, notes } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.doctorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only prescribe for your own appointments" });
    }

    const prescription = await Prescription.create({
      appointmentId,
      doctorId: req.user.id,
      patientId: appointment.patientId,
      medicines,
      notes,
    });

    res.status(201).json(prescription);
  } catch (err) {
    res.status(500).json({ message: "Failed to create prescription", error: err.message });
  }
};


exports.dispensePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    if (prescription.dispensed) {
      return res.status(400).json({ message: "Prescription already dispensed" });
    }

    prescription.dispensed = true;
    await prescription.save();

    res.status(200).json(prescription);
  } catch (err) {
    res.status(500).json({ message: "Failed to dispense prescription", error: err.message });
  }
};