const Appointment = require("../models/Appointment");
const Schedule = require("../models/Schedule");

exports.bookAppointment = async (req, res) => {
  try {
    const { scheduleId, symptoms } = req.body;

    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule slot not found" });
    }
    if (schedule.isBooked) {
      return res.status(400).json({ message: "This slot is already booked" });
    }

    const appointment = await Appointment.create({
      patientId: req.user.id,
      doctorId: schedule.doctorId,
      scheduleId: schedule._id,
      symptoms,
    });

    schedule.isBooked = true;
    await schedule.save();

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
};



exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["approved", "rejected", "completed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.doctorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own appointments" });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ message: "Failed to update appointment", error: err.message });
  }
};