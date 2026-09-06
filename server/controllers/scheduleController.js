const Schedule = require("../models/Schedule");

exports.createSchedule = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;

    const schedule = await Schedule.create({
      doctorId: req.user.id,
      date,
      startTime,
      endTime,
    });

    res.status(201).json(schedule);
  } catch (err) {
    res.status(500).json({ message: "Failed to create schedule", error: err.message });
  }
};

exports.getAvailableSchedules = async (req, res) => {
  try {
    const { doctorId } = req.query;

    const filter = { isBooked: false };
    if (doctorId) filter.doctorId = doctorId;

    const schedules = await Schedule.find(filter);
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch schedules", error: err.message });
  }
};
