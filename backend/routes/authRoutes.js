import express from "express";
import { loginUser } from "../controllers/authController.js";

const router = express.Router();

// Login
router.post("/login", loginUser);

// Register (optional — usually only DBA can create users)
// If you want only DBA to register users, remove this and use /users/create instead


export default router;
