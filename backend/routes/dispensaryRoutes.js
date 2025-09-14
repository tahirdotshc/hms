import express from "express";
import {
  createDispensary,
  getDispensaries,
  updateDispensary,
  deleteDispensary,
} from "../controllers/dispensaryController.js";
import { protect } from "../middleware/authMiddleware.js";
import { checkPermission } from "../middleware/permissionMiddleware.js";

const router = express.Router();

router.post("/", protect, checkPermission("dispensaries:create"), createDispensary);
router.get("/", protect, checkPermission("dispensaries:read"), getDispensaries);
router.put("/:id", protect, checkPermission("dispensaries:update"), updateDispensary);
router.delete("/:id", protect, checkPermission("dispensaries:delete"), deleteDispensary);

export default router;
