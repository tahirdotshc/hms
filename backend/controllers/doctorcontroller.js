import mongoose from "mongoose";

// Define Doctor schema & model
const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    email: { type: String, unique: true },
    phone: { type: String },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

// CREATE doctor
export const createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ doctors
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE doctor
export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE doctor
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
