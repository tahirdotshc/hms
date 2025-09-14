import Medicine from "../models/medicine.js";

// Add medicine
export const addMedicine = async (req, res) => {
  const { name, description, stock, price, store, expiryDate } = req.body;

  const medicine = await Medicine.create({
    name,
    description,
    stock,
    price,
    store,
    expiryDate,
  });

  res.status(201).json(medicine);
};

// Get all medicines
export const getMedicines = async (req, res) => {
  const medicines = await Medicine.find();
  res.json(medicines);
};
