import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true, min: 0 },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Medicine", medicineSchema);
