import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import AddressModal from "../components/AddressModal";
import Navbar from "../components/Navbar";

export default function CartPage() {
  const { cart, fetchCart, removeFromCart } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await api.get("/api/address", { withCredentials: true });
      setAddresses(res.data);
      if (res.data.length > 0) setSelectedAddress(res.data[0]._id);
    } catch (err) {
      console.error("Error fetching addresses", err);
      toast.error("Failed to load addresses");
    }
  };

  const handleCheckout = async () => {
    if (!selectedAddress) {
      toast.error("Please select or add an address!");
      return;
    }

    try {
      await api.post(
        "/api/cart/checkout",
        { addressId: selectedAddress },
        { withCredentials: true }
      );
      toast.success("Checkout successful!");
      fetchCart();
      navigate("/orders");
    } catch (err) {
      toast.error(err.response?.data?.message || "Checkout failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#fff8f8] p-6 mt-16">
        <h1 className="text-2xl font-bold text-[#ffaaaa] mb-6">Your Cart</h1>

        {cart?.items?.length === 0 ? (
          <p className="text-center text-[#b76e5f]">
            Your cart is empty.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 🛒 Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.bag._id}
                  className="flex items-center justify-between p-4 bg-white rounded-2xl shadow"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.bag.imageUrl}
                      alt={item.bag.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div>
                      <p className="font-semibold text-[#b76e5f]">
                        {item.bag.name}
                      </p>
                      <p className="text-gray-500">
                        ₹{item.bag.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.bag._id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* 🏠 Address + Summary */}
            <div className="bg-white shadow rounded-2xl p-4">
              <h2 className="text-lg font-semibold text-[#ffaaaa] mb-3">
                Delivery Address
              </h2>

              {addresses.length === 0 ? (
                <button
                  onClick={() => {
                    setEditingAddress(null);
                    setShowAddressModal(true);
                  }}
                  className="bg-[#ffaaaa] text-white px-4 py-2 rounded-xl w-full"
                >
                  + Add Address
                </button>
              ) : (
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <label
                      key={addr._id}
                      className="flex items-center justify-between p-3 border rounded-lg cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress === addr._id}
                        onChange={() => setSelectedAddress(addr._id)}
                      />
                      <span className="ml-2 text-sm text-[#b76e5f]">
                        {addr.fullName}, {addr.street}, {addr.city} -{" "}
                        {addr.pincode}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setEditingAddress(addr);
                          setShowAddressModal(true);
                        }}
                        className="text-blue-500 text-sm underline"
                      >
                        Edit
                      </button>
                    </label>
                  ))}
                  <button
                    onClick={() => {
                      setEditingAddress(null);
                      setShowAddressModal(true);
                    }}
                    className="mt-2 text-[#ffaaaa] underline text-sm"
                  >
                    + Add New Address
                  </button>
                </div>
              )}

              {/* 💰 Order Summary */}
              <div className="mt-6 border-t pt-4">
                <p className="flex justify-between text-[#b76e5f] font-semibold">
                  <span>Total:</span> <span>₹{cart.totalPrice}</span>
                </p>
                <button
                  onClick={handleCheckout}
                  className="mt-4 w-full bg-[#ffaaaa] text-white py-3 rounded-xl font-semibold hover:bg-[#ffcfcf]"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {showAddressModal && (
          <AddressModal
            address={editingAddress}
            onClose={() => setShowAddressModal(false)}
            onSave={fetchAddresses}
          />
        )}
      </div>
    </>
  );
}
