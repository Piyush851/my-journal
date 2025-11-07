// controllers/entryController.js
const Entry = require("../models/Entry");

exports.getEntries = async (req, res) => {
    try {
        const entries = await Entry.find({ userId: req.userId })
            .sort({ date: -1 });

        return res.json({ success: true, entries });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


exports.getEntry = async (req, res) => {
    try {
        const entry = await Entry.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!entry) {
            return res.status(404).json({ error: "Entry not found" });
        }

        return res.json({ success: true, entry });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


exports.createEntry = async (req, res) => {
    try {
        const { title, content, mood, date } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required" });
        }

        const entry = new Entry({
            userId: req.userId,
            title,
            content,
            mood: mood || "happy",
            date: date || new Date()
        });

        await entry.save();

        return res.status(201).json({
            success: true,
            entry
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


exports.updateEntry = async (req, res) => {
    try {
        const entry = await Entry.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!entry) {
            return res.status(404).json({ error: "Entry not found" });
        }

        const { title, content, mood } = req.body;

        if (title) entry.title = title;
        if (content) entry.content = content;
        if (mood) entry.mood = mood;

        await entry.save();

        return res.json({ success: true, entry });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.deleteEntry = async (req, res) => {
    try {
        const entry = await Entry.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });

        if (!entry) {
            return res.status(404).json({ error: "Entry not found" });
        }

        return res.json({ success: true, message: "Entry deleted" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


exports.getStats = async (req, res) => {
    try {
        const totalEntries = await Entry.countDocuments({ userId: req.userId });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayEntries = await Entry.countDocuments({
            userId: req.userId,
            date: { $gte: today }
        });

        const moodCounts = await Entry.aggregate([
            { $match: { userId: req.userId } },
            { $group: { _id: "$mood", count: { $sum: 1 } } }
        ]);

        return res.json({
            success: true,
            stats: {
                totalEntries,
                todayEntries,
                moodCounts,
            }
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



