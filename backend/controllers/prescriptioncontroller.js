import Prescription from "../models/prescription.js";

// Doctor creates prescription
export const createPrescription = async (req, res) => {
  const { patientId, medicines, notes } = req.body;

  const prescription = await Prescription.create({
    patientId,
    doctorId: req.user._id,
    medicines,
    notes,
  });

  res.status(201).json(prescription);
};

// Get prescriptions for patient
export const getPatientPrescriptions = async (req, res) => {
  const prescriptions = await Prescription.find({ patientId: req.user._id })
    .populate("doctorId", "name email")
    .populate("medicines.medicineId", "name price");
  res.json(prescriptions);
};
