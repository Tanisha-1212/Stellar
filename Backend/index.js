const express = require('express');
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const {isLoggedIn, isAdmin} = require("./middleware/authMiddleware");
const bagRoutes = require("./routes/bagRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRouter")

require("dotenv").config();
connectDB();

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(cors());
app.use(express.json());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // Max 100 requests per IP in this window
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter); // Apply this limiter to all routes


app.use("/api/auth", authRoutes);

app.use("/api/bags", bagRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

// Error handling for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT ||5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});