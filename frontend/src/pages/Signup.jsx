// src/pages/SignupPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import Navbar from "../components/Navbar";

export default function SignupPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/api/auth/signup", { username, email, password }, {withCredentials: true});
      login({ token: res.data.token, user: res.data.user });
      navigate("/"); // redirect to landing page
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
    <Navbar className="opacity-0"/>
    <div className="min-h-screen flex items-center justify-center px-6 bg-cover bg-center"
      style={{
        backgroundImage: "url('https://i.pinimg.com/1200x/b4/7c/b2/b47cb22dabc3f196139097d927d598a3.jpg')",
      }}
    >
      <motion.div
        className="w-full max-w-md bg-white/30 opacity-0 rounded-xl shadow-lg p-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-[#ffaaaa] mb-6 text-center">Signup</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-3 border border-[#ffaaaa] text-[#b76e5f] rounded-lg focus:outline-[#ffaaaa]"
          />
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
            Signup
          </button>
        </form>
        <p className="mt-4 text-[#ffaaaa] text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[#ffaaaa] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
    </>
  );
}
