import express from "express";
import { addMedicine, getMedicines } from "../controllers/medicinecontroller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addMedicine);
router.get("/", protect, getMedicines);

export default router;
