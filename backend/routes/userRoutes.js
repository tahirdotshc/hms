import express from "express";
import {
  getUsers,
  assignRole,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { checkPermission } from "../middleware/permissionMiddleware.js";

const router = express.Router();

// Get all users (DBA/Admin only)
router.get("/", protect, checkPermission("users:read"), getUsers);

// Assign role to user (DBA only)
router.put(
  "/:id/assign-role",
  protect,
  checkPermission("users:assignRole"),
  assignRole
);

export default router;
