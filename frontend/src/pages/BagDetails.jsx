import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api"; // axios instance with baseURL
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const BagDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bag, setBag] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarBags, setSimilarBags] = useState([]);
  const [adding, setAdding] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchBag = async () => {
      try {
        const res = await api.get(`/api/bags/${id}`);
        setBag(res.data);

        const similarRes = await api.get("/api/bags", {
          params: { category: res.data.category, limit: 4 },
        });
        setSimilarBags(similarRes.data.bags.filter((b) => b._id !== id));
      } catch (err) {
        console.error(err);
        toast.error("Failed to load bag details");
      } finally {
        setLoading(false);
      }
    };

    fetchBag();
  }, [id]);

  const handleAddToCart = async () => {
    if(adding) return;
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart!");
      navigate("/login");
      return;
    }

    try {
      setAdding(true);
      // Update CartContext (frontend)
      addToCart({
        _id: bag._id,
        name: bag.name,
        price: bag.price,
        imageUrl: bag.imageUrl,
        quantity: 1,
      });

      toast.success("Added to cart!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p className="text-center mt-10 text-[#ffaaaa]">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#fff5f5] p-6 mt-12 overflow-y-scroll hide-scrollbar">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-[#ffaaaa] font-semibold hover:underline"
        >
          ← Back
        </button>

        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-8 mb-5">
          <div className="md:w-1/2 flex items-center justify-center">
            <img
              src={bag.imageUrl || "https://via.placeholder.com/400x400?text=Bag"}
              alt={bag.name}
              className="rounded-xl border-4 border-[#ffaaaa] object-contain w-full h-[450px]"
            />
          </div>

          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{bag.name}</h1>
              <p className="text-gray-600 mt-4">{bag.description}</p>
            </div>
            <div className="mt-6">
              <p className="text-2xl font-bold text-[#ffaaaa]">₹ {bag.price}</p>
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="mt-4 bg-[#ffaaaa] text-white px-6 py-2 rounded-xl shadow-md hover:bg-[#e79999] transition disabled:opacity-50"
              >
                {adding ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>

        {similarBags.length > 0 && (
          <div className="max-w-6xl mx-auto mt-12">
            <h2 className="text-2xl font-bold text-[#ffaaaa] mb-6 text-center">
              You may also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {similarBags.map((b, index) => (
                <motion.div
                  key={b._id}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/bags/${b._id}`}
                    className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                  >
                    <img
                      src={b.imageUrl || "https://via.placeholder.com/300x300?text=Bag"}
                      alt={b.name}
                      className="w-full h-64 object-contain p-2"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-700">{b.name}</h3>
                      <p className="text-[#ffaaaa] font-bold mt-2">₹{b.price}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BagDetails;



