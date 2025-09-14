import express from "express";
import {
  createDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";
import { protect } from "../middleware/authMiddleware.js";
import { checkPermission } from "../middleware/permissionMiddleware.js";

const router = express.Router();

// CREATE doctor
router.post("/", protect, checkPermission("doctors:create"), createDoctor);

// READ doctors
router.get("/", protect, checkPermission("doctors:read"), getDoctors);

// UPDATE doctor
router.put("/:id", protect, checkPermission("doctors:update"), updateDoctor);

// DELETE doctor
router.delete("/:id", protect, checkPermission("doctors:delete"), deleteDoctor);

export default router;
