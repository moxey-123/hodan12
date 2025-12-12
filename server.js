// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authMiddleware = require("./middleware/auth");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
// Admin routes (login / create-admin) remain public
app.use("/api/admin", require("./routes/adminAuth"));

// Protected routes (require JWT)
app.use("/courses", authMiddleware, require("./routes/courseRoutes"));
app.use("/students", authMiddleware, require("./routes/studentRoutes"));

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Hodan College Backend Running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
