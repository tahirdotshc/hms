import Dispensing from "../models/dispensing.js";
import Medicine from "../models/medicine.js";
import Prescription from "../models/prescription.js";

// Dispense medicine from store
export const dispenseMedicine = async (req, res) => {
  const { prescriptionId, store } = req.body;

  const prescription = await Prescription.findById(prescriptionId).populate("medicines.medicineId");

  if (!prescription) return res.status(404).json({ message: "Prescription not found" });

  let outOfStock = false;

  for (const item of prescription.medicines) {
    const med = await Medicine.findById(item.medicineId._id);
    if (med.store !== store || med.stock < item.qty) {
      outOfStock = true;
      break;
    }
  }

  const dispensing = await Dispensing.create({
    prescriptionId,
    dispenserId: req.user._id,
    store,
    status: outOfStock ? "out_of_stock" : "dispensed",
  });

  if (!outOfStock) {
    for (const item of prescription.medicines) {
      await Medicine.findByIdAndUpdate(item.medicineId._id, {
        $inc: { stock: -item.qty },
      });
    }
  }

  res.status(201).json(dispensing);
};
