import mongoose from "mongoose";

const dispensingSchema = new mongoose.Schema({
  prescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: "Prescription" },
  dispenserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  store: { type: String, enum: ["judges", "services"] },
  status: {
    type: String,
    enum: ["pending", "dispensed", "out_of_stock"],
    default: "pending",
  },
  date: { type: Date, default: Date.now },
});

const Dispensing = mongoose.model("Dispensing", dispensingSchema);
export default Dispensing;
