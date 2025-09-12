import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import FilterBar from "../components/FilterBar";
import api from "../api"; // axios instance with baseURL
import Navbar from "../components/Navbar"

const ShopPage = () => {
  const [bags, setBags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filters, setFilters] = useState({});
  const [searchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category"); // ?category=<category>

  const fetchBags = async (pageNum = 1, filterParams = {}) => {
    try {
      setLoading(true);

      const params = { page: pageNum, limit: 8, ...filterParams };
      if (categoryFromUrl) {
        params.category = categoryFromUrl;
      }

      const res = await api.get("/api/bags", { params });

      setBags(res.data.bags);
      setPage(res.data.page);
      setPages(res.data.pages);
    } catch (err) {
      console.error("Error fetching bags:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBags(page, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters, categoryFromUrl]);

  if (loading)
    return <p className="text-center text-[#ffaaaa] mt-10 text-xl">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-text-[#ffaaaa] text-lg">Error: {error}</p>
    );

  return (
    <>
    <Navbar/>
    <div className="p-6 min-h-screen bg-[#fff5f5] mt-12">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#ffaaaa]">
        {categoryFromUrl ? `${categoryFromUrl} Bags` : "All Bags"}
      </h2>

      {/* FilterBar */}
      <FilterBar
        categories={["Backpacks", "Tote", "Handbags", "Clutches"]}
        brands={["BrandA", "BrandB", "BrandC"]}
        onFilter={setFilters}
      />

      {/* Bags Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
        {bags.map((bag, index) => (
          <motion.div
            key={bag._id}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={`/bags/${bag._id}`}
              className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={bag.imageUrl || "https://via.placeholder.com/300x300?text=Bag"}
                alt={bag.name}
                className="w-full h-64 object-contain p-2"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  {bag.name}
                </h3>
                <p className="text-[#ffaaaa] font-bold mt-2">₹{bag.price}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-5 py-2 rounded-lg bg-[#ffaaaa] text-white font-medium disabled:opacity-50 hover:bg-[#ff8888] transition"
        >
          Prev
        </button>
        <span className="px-4 py-2 text-gray-700 font-semibold">
          Page {page} of {pages}
        </span>
        <button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
          className="px-5 py-2 rounded-lg bg-[#ffaaaa] text-white font-medium disabled:opacity-50 hover:bg-[#ff8888] transition"
        >
          Next
        </button>
      </div>
    </div>
    </>
  );
};

export default ShopPage;


