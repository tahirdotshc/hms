export const roleThemeDefaults = {
  dba: "dark",
  admin: "dark",
  doctor: "light",
  dispenser: "light",
  patient: "light",
};

export const getDefaultThemeForRole = (role) => {
  return roleThemeDefaults[role] || "light";
};
