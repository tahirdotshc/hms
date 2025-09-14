import express from "express";
import { dispenseMedicine } from "../controllers/dispensercontroller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/dispense", protect, dispenseMedicine);

export default router;
