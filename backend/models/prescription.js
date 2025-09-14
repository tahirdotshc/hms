import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  medicines: [
    {
      medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
      qty: Number,
    },
  ],
  date: { type: Date, default: Date.now },
  notes: String,
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;
