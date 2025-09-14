export const checkPermission = (requiredAction) => {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role) return res.status(403).json({ message: "No role assigned" });

    const allowed = role.permissions?.some(
      (p) => p.action === requiredAction || p.action === `${requiredAction.split(":")[0]}:*`
    );

    if (!allowed) {
      return res.status(403).json({ message: "Permission denied" });
    }

    next();
  };
};
