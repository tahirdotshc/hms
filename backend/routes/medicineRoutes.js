import express from "express";
import {
  addMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
} from "../controllers/medicineController.js";
import { protect } from "../middleware/authMiddleware.js";   // ✅ import protect
import { checkPermission } from "../middleware/permissionMiddleware.js"; // optional

const router = express.Router();

// CREATE
router.post("/", protect, checkPermission("medicines:create"), addMedicine);

// READ
router.get("/", protect, checkPermission("medicines:read"), getMedicines);

// UPDATE
router.put("/:id", protect, checkPermission("medicines:update"), updateMedicine);

// DELETE
router.delete("/:id", protect, checkPermission("medicines:delete"), deleteMedicine);

export default router;
