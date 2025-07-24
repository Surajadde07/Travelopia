const mongoose = require("mongoose");

require("dotenv").config();

let cachedConnection = null;

const dbConnect = async () => {
    try {
        // If we already have a cached connection, use it
        if (cachedConnection && mongoose.connection.readyState === 1) {
            console.log("Using cached database connection");
            return cachedConnection;
        }

        // For serverless, we need to handle existing connections properly
        if (mongoose.connection.readyState === 1) {
            console.log("Already connected to MongoDB");
            cachedConnection = mongoose.connection;
            return cachedConnection;
        }

        // Close any existing connections that might be hanging
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }

        console.log("Creating new database connection...");
        
        const connection = await mongoose.connect(process.env.DATABASE_URL, {
            // Optimized settings for serverless
            maxPoolSize: 5, // Limit connection pool size
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 10000, // Close sockets after 10 seconds of inactivity
            bufferMaxEntries: 0, // Disable mongoose's buffering mechanism
            bufferCommands: false, // Disable mongoose's buffering mechanism
        });
        
        cachedConnection = connection;
        console.log("Database connection successful");
        return connection;
        
    } catch (error) {
        console.error("Database connection failed:", error.message);
        // Reset cached connection on error
        cachedConnection = null;
        throw error;
    }
}

module.exports = dbConnect;