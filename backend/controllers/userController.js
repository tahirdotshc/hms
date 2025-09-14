import User from "../models/User.js";
import Role from "../models/Role.js";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Assign role
export const assignRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleId } = req.body;

    const role = await Role.findById(roleId);
    if (!role) return res.status(404).json({ message: "Role not found" });

    const user = await User.findByIdAndUpdate(
      id,
      { role: roleId },
      { new: true }
    ).populate("role");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
