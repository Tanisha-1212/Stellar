// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Pass only email and password; token is handled by backend cookie
      await login({ email, password });
      navigate("/"); // redirect after successful login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
    <Navbar/>
      <div
        className="min-h-screen flex items-center justify-center px-6 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/b4/7c/b2/b47cb22dabc3f196139097d927d598a3.jpg')",
        }}
      >
        <motion.div
          className="w-full max-w-md bg-white/30 opacity-0 rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-[#ffaaaa] mb-6 text-center">
            Login
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 border border-[#ffaaaa] text-[#b76e5f] rounded-lg focus:outline-[#ffaaaa]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-3 border border-[#ffaaaa] text-[#b76e5f] rounded-lg focus:outline-[#ffaaaa]"
            />
            <button
              type="submit"
              className="mt-2 px-4 py-3 bg-[#ffaaaa] text-white rounded-xl font-semibold hover:bg-[#ffcfcf]"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-[#ffaaaa] text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#ffaaaa] font-semibold hover:underline"
            >
              Signup
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
}
