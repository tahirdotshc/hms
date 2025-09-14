import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const login = async (req,res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).populate('role');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role?.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, username: user.username, role: user.role?.name, menus: user.role?.menus || [], permissions: user.role?.permissions || [] } });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
