import React, { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import AddressModal from "../components/AddressModal";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({ fullName: "", email: "", phone: "" });
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    fetchProfile();
    fetchAddresses();
    fetchOrders();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/user/profile", { withCredentials: true });
      setProfile(res.data);
    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  const fetchAddresses = async () => {
    try {
      const res = await api.get("/api/address", { withCredentials: true });
      setAddresses(res.data);
    } catch (err) {
      toast.error("Failed to load addresses");
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/user/orders", { withCredentials: true });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put("/api/user/profile", profile, { withCredentials: true });
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    try {
      await api.put("/api/user/change-password", passwords, { withCredentials: true });
      toast.success("Password changed successfully!");
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await api.put(`/api/orders/${orderId}/cancel`, {}, { withCredentials: true });
      toast.success("Order cancelled successfully!");
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel order");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#fff8f8] p-6 mt-16">
        <h1 className="text-2xl font-bold text-[#ffaaaa] mb-6 text-center">My Profile</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 justify-center items-center">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded-xl font-semibold ${
              activeTab === "profile"
                ? "bg-[#ffaaaa] text-white"
                : "bg-white text-[#b76e5f] border"
            }`}
          >
            Personal Info
          </button>
          <button
            onClick={() => setActiveTab("address")}
            className={`px-4 py-2 rounded-xl font-semibold ${
              activeTab === "address"
                ? "bg-[#ffaaaa] text-white"
                : "bg-white text-[#b76e5f] border"
            }`}
          >
            Saved Addresses
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl font-semibold ${
              activeTab === "orders"
                ? "bg-[#ffaaaa] text-white"
                : "bg-white text-[#b76e5f] border"
            }`}
          >
            Orders
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && (
          <div className="space-y-6 max-w-lg mx-auto">
            {/* Personal Info Form */}
            <form onSubmit={handleProfileUpdate} className="bg-white shadow rounded-2xl p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[#b76e5f] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-[#b76e5f] mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full border rounded-lg p-2 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-[#b76e5f] mb-1">Phone</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#ffaaaa] text-white px-6 py-2 rounded-xl hover:bg-[#ffcfcf]"
                >
                  Save Changes
                </button>
              </div>
            </form>

            {/* Password Change Form */}
            <form onSubmit={handlePasswordChange} className="bg-white shadow rounded-2xl p-6">
              <h2 className="text-[#ffaaaa] font-semibold mb-4">Change Password</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#b76e5f] mb-1">Old Password</label>
                  <input
                    type="password"
                    value={passwords.oldPassword}
                    onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-[#b76e5f] mb-1">New Password</label>
                  <input
                    type="password"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-[#b76e5f] mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#ffaaaa] text-white px-6 py-2 rounded-xl hover:bg-[#ffcfcf]"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Address Tab */}
        {activeTab === "address" && (
          <div className="bg-white shadow rounded-2xl p-6 max-w-lg mx-auto space-y-3">
            {addresses.length === 0 && (
              <p className="text-[#b76e5f] text-sm">No addresses saved yet.</p>
            )}
            {addresses.map((addr) => (
              <div key={addr._id} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-[#b76e5f] text-sm">
                  {addr.fullName}, {addr.street}, {addr.city} - {addr.pincode}
                </span>
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      setEditingAddress(addr);
                      setShowAddressModal(true);
                    }}
                    className="text-blue-500 text-sm underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await api.delete(`/api/address/${addr._id}`, { withCredentials: true });
                        toast.success("Address deleted");
                        fetchAddresses();
                      } catch {
                        toast.error("Failed to delete address");
                      }
                    }}
                    className="text-red-500 text-sm underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                setEditingAddress(null);
                setShowAddressModal(true);
              }}
              className="bg-[#ffaaaa] text-white px-4 py-2 rounded-xl w-full"
            >
              + Add New Address
            </button>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white shadow rounded-2xl p-6 max-w-lg mx-auto space-y-4">
            {orders.length === 0 ? (
              <p className="text-[#b76e5f] text-sm">No orders yet.</p>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="p-3 border rounded-lg text-[#b76e5f]">
                  <p className="font-semibold">Order #{order._id}</p>
                  <p>Total: ₹{order.totalPrice}</p>
                  <p>Status: {order.status}</p>
                  {order.status === "pending" && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="mt-2 bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Address Modal */}
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
