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
      _id: user.id,
      username: user.username,
      email: user.email,
      role: user.role?.name || null,   // ✅ return role name
      token: generateToken(user.id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
