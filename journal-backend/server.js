// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const entryRoutes = require("./routes/entryRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/entries", entryRoutes);

// Health Route
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Journal API running" });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error("🔥 GLOBAL ERROR:", err);

    if (res.headersSent) {
        return next(err);
    }

    return res.status(500).json({
        error: err.message || "Server error"
    });
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));
