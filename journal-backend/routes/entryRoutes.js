// routes/entryRoutes.js
const express = require("express");
const router = express.Router();

const {
    getEntries,
    getEntry,
    createEntry,
    updateEntry,
    deleteEntry,
    getStats,
} = require("../controllers/entryController");

const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/", getEntries);
router.get("/:id", getEntry);
router.post("/", createEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);
router.get("/stats/summary", getStats);

module.exports = router;
