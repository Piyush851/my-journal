// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const entryRoutes = require("./routes/entryRoutes");

const app = express();

// CORS
app.use(
    cors({
        origin: "*",
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: "Content-Type, Authorization"
    })
);

app.use(express.json());

// Connect DB
connectDB().catch(err => {
    console.error("❌ DB connection failed:", err);
});

// Root
app.get("/", (req, res) => {
    res.send("Journal API is running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/entries", entryRoutes);

// Health Route
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Journal API running" });
});

// Check DB Route
app.get("/api/check-db", async (req, res) => {
    const dbName = mongoose.connection.name;
    return res.json({ connectedDatabase: dbName });
});

// Fallback Route (FIXED)
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("🔥 GLOBAL ERROR:", err);

    if (res.headersSent) return next(err);

    res.status(500).json({
        error: err.message || "Server error"
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
    console.log(`🚀 Server running on port ${PORT}`)
);
