import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: String,
  description: String,
  stock: Number,
  price: Number,
  store: {
    type: String,
    enum: ["judges", "services"],
    required: true,
  },
  expiryDate: Date,
});

const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;
