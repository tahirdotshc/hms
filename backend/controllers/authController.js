// backend/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // adjust path if your User model file name differs

// helper to generate token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || "supersecret", // use env var in production
    { expiresIn: "1d" }
  );
};

export const loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // allow login with either email or username
    const user = await User.findOne({
      $or: [{ email: userId }, { username: userId }],
    }).populate("role");

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      token: generateToken(user._id),
      role: user.role?.name || user.role || null,
      username: user.username,
      _id: user._id,
    });
  } catch (err) {
    console.error("loginUser error:", err);
    res.status(500).json({ message: err.message });
  }
};
