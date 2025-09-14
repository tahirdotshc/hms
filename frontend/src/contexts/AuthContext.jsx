import React, { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    setUser(data);
    localStorage.setItem("token", data.token);
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const hasPermission = (action) => {
    if (!user) return false;
    if (user.role === "dba") return true;
    return (user.permissions || []).some((p) => p.action === action && p.allowed);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};
