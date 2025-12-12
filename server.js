const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

// Routes
app.use("/courses", require("./routes/courseRoutes"));
app.use("/students", require("./routes/studentRoutes"));
app.use("/api/admin", require("./routes/adminAuth"));

// Root route
app.get("/", (req, res) => {
  res.send("Hodan College Backend Running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
