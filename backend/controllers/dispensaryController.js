import mongoose from "mongoose";

const dispensarySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String },
    medicines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Medicine" }],
  },
  { timestamps: true }
);

const Dispensary = mongoose.model("Dispensary", dispensarySchema);

// CREATE
export const createDispensary = async (req, res) => {
  try {
    const { name, location } = req.body;
    const exists = await Dispensary.findOne({ name });
    if (exists) return res.status(400).json({ message: "Dispensary already exists" });

    const dispensary = await Dispensary.create({ name, location });
    res.status(201).json(dispensary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ
export const getDispensaries = async (req, res) => {
  try {
    const dispensaries = await Dispensary.find().populate("medicines");
    res.json(dispensaries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateDispensary = async (req, res) => {
  try {
    const { id } = req.params;
    const dispensary = await Dispensary.findByIdAndUpdate(id, req.body, { new: true });
    if (!dispensary) return res.status(404).json({ message: "Not found" });
    res.json(dispensary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteDispensary = async (req, res) => {
  try {
    const { id } = req.params;
    const dispensary = await Dispensary.findByIdAndDelete(id);
    if (!dispensary) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Dispensary deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
