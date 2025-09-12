import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ToteImage from '../assets/images/tote_bag.png'
import Handbag from '../assets/images/handbag.png';
import Backpack from '../assets/images/backpack.png';
import Crossbody from '../assets/images/crossbody.png';
import Clutch from '../assets/images/clutch.png'


export default function LandingPage() {
  // Category data with banner images
  const categories = [
    { name: "Tote Bag", imageUrl: ToteImage },
    { name: "Handbag", imageUrl: Handbag },
    { name: "Backpack", imageUrl: Backpack },
    { name: "Crossbody Bag", imageUrl: Crossbody },
    { name: "Clutch", imageUrl: Clutch }
  ];

  return (
    <div className="min-h-screen bg-white relative">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center  max-w-6xl mx-auto px-6 pt-24 mt-2 mb-5">
        {/* Text & Buttons */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#ffaaaa] mb-4">
            Discover Your Perfect Bag
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-6">
            Stylish. Minimal. Just for you. Explore our curated collection of premium bags.
          </p>

            {/* Shop Now Button */}
            <motion.div whileHover={{ scale: 1.05 }} >
              <Link
                to="/bags"
                className="px-6 py-3 rounded-xl bg-[#ffaaaa] text-white font-semibold text-lg hover:bg-[#ffe3e3]"
              >
                Shop Now
              </Link>
            </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="md:w-1/2 flex justify-center mb-10 md:mb-0"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://i.pinimg.com/1200x/c0/6d/13/c06d13e4d1b9020f885e36adfe9d138b.jpg"
            alt="Hero Bag"
            className="rounded-xl shadow-lg h-120 w-100"
          />
        </motion.div>
      </section>

      {/* Category Banner Sections */}
      {categories.map((cat, index) => (
        <motion.section
          key={cat.name}
          className="max-w-6xl mx-auto px-6 py-12 mb-12 rounded-xl flex flex-col md:flex-row items-center bg-[#ffe3e3]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          {/* Image Side */}
          <div className="w-full md:w-1/2 flex items-center justify-center mb-6 md:mb-0">
            <img
              src={cat.imageUrl}
              alt={cat.name}
              className="w-full h-64 md:h-80 object-contain rounded-xl bg-[#ffe3e3]"
            />
          </div>

          {/* Button Side */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <Link
              to={`/bags?category=${cat.name}`}
              className="px-8 py-4 bg-[#ffaaaa] text-white rounded-xl text-xl font-semibold hover:[#ffe3e3]"
            >
              Explore {cat.name}
            </Link>
          </div>
        </motion.section>
      ))}
    </div>
  );
}
