// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { cartCount } = useCart();

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full bg-white shadow-md z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Brand Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-[#ffaaaa] hover:scale-105 transition-transform"
        >
          Stellar
        </Link>

        {/* Nav Links */}
        <div className="flex space-x-6 items-center">
          <Link
            to="/"
            className="text-[#ffaaaa] hover:text-[#ffc3c3] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/bags"
            className="text-[#ffaaaa] hover:text-[#ffc3c3] transition-colors"
          >
            Bags
          </Link>

          {isAuthenticated ? (
            <>
              {/* Show Username */}
              <Link to="/profile">
              <span className="text-[#ffaaaa]">
                Hello, <span className="font-medium">{user.username}</span>
              </span>
              </Link>

              {/* Cart Link */}
              <Link
                to="/cart"
                className="relative text-[#ffaaaa] hover:text-[#ffc3c3] transition-colors"
              >
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-[#ffaaaa] text-white text-xs font-bold rounded-full px-2 py-0.5">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="text-[#ffaaaa] hover:text-[#ffc3c3] transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[#ffaaaa] hover:text-[#ffc3c3] transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-[#ffaaaa] hover:text-[#ffc3c3] transition-colors"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}


