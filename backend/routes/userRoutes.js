import express from "express";
import {
  registerUser,
  loginUser,
  assignRole,
} from "../controllers/userController.js";
import {
  getUsers,
  softDeleteUser,
  restoreUser,
} from "../controllers/userAdminController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/assign-role/:id", assignRole);

// DBA-only management
router.get("/", getUsers);
router.put("/:id/soft-delete", softDeleteUser);
router.put("/:id/restore", restoreUser);

export default router;
