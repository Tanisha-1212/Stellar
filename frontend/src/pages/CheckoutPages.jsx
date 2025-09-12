// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import api from "../api";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await api.post("/payment/stripe"); // backend endpoint
      window.location.href = res.data.url; // redirect to Stripe Checkout
    } catch (err) {
      alert("Payment failed: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="px-6 py-3 bg-pink-400 text-white rounded-lg hover:bg-pink-300"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}

