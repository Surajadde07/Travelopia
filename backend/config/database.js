const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = async () => {
    try {
        // For serverless environments, we don't want to exit the process on error
        if (mongoose.connections[0].readyState) {
            console.log("Already connected to MongoDB");
            return;
        }

        await mongoose.connect(process.env.DATABASE_URL, {
            // Remove deprecated options
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });
        
        console.log("DB connection is successful");
    } catch (error) {
        console.log("Issue in DB Connection");
        console.log(error.message);
        // Don't exit process in serverless environment
        throw error;
    }
}

module.exports = dbConnect;