import { useState } from "react";

const FilterBar = ({ categories, brands, onFilter }) => {
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    price: 5000, // max price by default
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    onFilter({
      category: filters.category,
      brand: filters.brand,
      maxPrice: filters.price,
    });
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-6 mb-8 p-4 bg-white shadow rounded-xl border border-[#ffaaaa]/40">
      {/* Category */}
      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="p-2 rounded-lg border border-gray-300"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Brand */}
      <select
        name="brand"
        value={filters.brand}
        onChange={handleChange}
        className="p-2 rounded-lg border border-gray-300"
      >
        <option value="">All Brands</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      {/* Price Slider */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-700 mb-1">
          Max Price: <span className="text-[#ff5555]">₹{filters.price}</span>
        </label>
        <input
          type="range"
          name="price"
          min="0"
          max="5000"
          step="100"
          value={filters.price}
          onChange={handleChange}
          className="w-48 accent-[#ffaaaa]"
        />
      </div>

      <button
        onClick={applyFilters}
        className="px-5 py-2 bg-[#ffaaaa] text-white rounded-lg hover:bg-[#ff8888] transition"
      >
        Apply
      </button>
    </div>
  );
};

export default FilterBar;


