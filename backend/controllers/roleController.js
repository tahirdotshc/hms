import Role from "../models/Role.js";

export const createRole = async (req, res) => {
  try {
    const { name, menus = [], permissions = [] } = req.body;
    if (await Role.findOne({ name })) return res.status(400).json({ message: "Role exists" });
    const role = await Role.create({ name, menus, permissions });
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
