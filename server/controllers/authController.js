const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const PatientProfile = require("../models/PatientProfile");
const DoctorProfile = require("../models/DoctorProfile");
const PharmacistProfile = require("../models/PharmacistProfile");
const LabTechnicianProfile = require("../models/LabTechnicianProfile");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, ...profileData } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });

    if (role === "patient") {
      await PatientProfile.create({ userId: newUser._id, ...profileData });
    } else if (role === "doctor") {
      await DoctorProfile.create({ userId: newUser._id, ...profileData });
    } else if (role === "pharmacist") {
      await PharmacistProfile.create({ userId: newUser._id, ...profileData });
    } else if (role === "lab_technician") {
      await LabTechnicianProfile.create({ userId: newUser._id, ...profileData });
    }
    

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};