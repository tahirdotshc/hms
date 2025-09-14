import mongoose from "mongoose";

// Define Medicine schema
const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    expiryDate: { type: Date },
  },
  { timestamps: true }
);

const Medicine = mongoose.model("Medicine", medicineSchema);

// CREATE
export const addMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);
    res.status(201).json(medicine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ
export const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });
    res.json({ message: "Medicine deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
