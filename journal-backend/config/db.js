const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ MongoDB connected");
        console.log("✅ CONNECTED TO HOST:", mongoose.connection.host);
        console.log("✅ CONNECTED TO DB NAME:", mongoose.connection.name);

    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
