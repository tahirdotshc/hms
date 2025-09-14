import { getDefaultThemeForRole } from "../utils/themeDefaults.js";

// Get theme preference
router.get("/theme", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  const theme = user.themePreference || getDefaultThemeForRole(user.role);
  res.json({ theme });
});
