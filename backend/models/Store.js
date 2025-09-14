import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // Judges / Services
    location: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Store", storeSchema);
