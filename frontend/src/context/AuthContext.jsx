// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api"; // your axios instance

// Top-level context (important for Vite HMR)
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user on first render
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me", {withCredentials: true});
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Login function
  const login = async ({ email, password }) => {
    try {
      const res = await api.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true } // important for HTTP-only cookie
      );
      setUser(res.data.user);
    } catch (err) {
      throw err; // UI will handle error messages
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post("/api/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth
export const useAuth = () => useContext(AuthContext);
