import express from "express";
import { getRoles } from "../controllers/roleController.js";
import { protect } from "../middleware/authMiddleware.js";
import { checkPermission } from "../middleware/permissionMiddleware.js";

const router = express.Router();

// Get all roles
router.get("/", protect, checkPermission("roles:read"), getRoles);

export default router;
