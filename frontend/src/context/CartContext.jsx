// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // Fetch cart from backend
  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCart({ items: [], totalPrice: 0 });
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await api.get("/api/cart", { withCredentials: true });
      setCart(res.data.cart);
    } catch (err) {
      console.error("Failed to fetch cart", err);
      setCart({ items: [], totalPrice: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const addToCart = async (bagId, quantity) => {
    if (!isAuthenticated) {
      toast.error("Please login to add to cart");
      return;
    }
    try {
      await api.post(
        "/api/cart/add",
        { bagId, quantity},
        { withCredentials: true }
      );
      toast.success("Added to cart!");
      fetchCart(); // refresh cart
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add to cart");
    }
  };

  const removeFromCart = async (bagId) => {
    try {
      await api.delete(`/api/cart/${bagId}`, { withCredentials: true });
      toast.success("Removed from cart");
      fetchCart();
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  const updateQuantity = async (bagId, quantity) => {
    try {
      await api.post(
        "/api/cart/remove-quantity",
        { bagId, quantity: quantity },
        { withCredentials: true }
      );
      fetchCart();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity");
    }
  };

  const checkout = async () => {
    try {
      await api.post("/api/cart/checkout", {}, { withCredentials: true });
      toast.success("Checkout successful!");
      fetchCart();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Checkout failed");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        checkout,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
