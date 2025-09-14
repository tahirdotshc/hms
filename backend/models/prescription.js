import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    medicines: [
      {
        medicine: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medicine",
          required: true,
        },
        qty: { type: Number, required: true, min: 1 },
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Dispensed"],
      default: "Pending",
    },
    dispenser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dispensedFromStore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Prescription", prescriptionSchema);
