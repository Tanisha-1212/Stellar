import React, { useState, useEffect } from "react";
import api from "../api";
import { toast } from "react-toastify";

export default function AddressModal({ address, onClose, onSave }) {
  const [form, setForm] = useState({
    fullName: "",
    street: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    if (address) {
      setForm(address);
    }
  }, [address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (address) {
        await api.put(`/api/address/${address._id}`, form, {
          withCredentials: true,
        });
        toast.success("Address updated successfully");
      } else {
        await api.post("/api/address", form, {
          withCredentials: true,
        });
        toast.success("Address added successfully");
      }
      onSave();
      onClose();
    } catch (err) {
      toast.error("Failed to save address");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#fff5f5] bg-opacity-40">
      <div className="bg-white rounded-2xl p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-[#b76e5f]">
          {address ? "Edit Address" : "Add Address"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className="w-full border border-gray-200 rounded-lg p-2"
          />
          <input
            type="text"
            placeholder="Street"
            value={form.street}
            onChange={(e) => setForm({ ...form, street: e.target.value })}
            className="w-full border border-gray-200 rounded-lg p-2"
          />
          <input
            type="text"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full border border-gray-200 rounded-lg p-2"
          />
          <input
            type="text"
            placeholder="Pincode"
            value={form.pincode}
            onChange={(e) => setForm({ ...form, pincode: e.target.value })}
            className="w-full border border-gray-200 rounded-lg p-2"
          />
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#ffaaaa] text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
