const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");
const tokenBlacklist = require('../config/tokenBlacklist');

// Middleware to verify if the user/admin is authenticated

exports.isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    console.log("Received Token:", token); // Debugging

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }

    // Check if the token is blacklisted
    if (tokenBlacklist.has(token)) {
        return res.status(401).json({ message: "Token is invalidated. Please log in again." });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        // First, check if the token belongs to an admin
        const admin = await Admin.findById(decoded.id).select("-password");
        if (admin) {
            req.user = admin; // Attach admin to the request
            req.userType = "admin"; // Optional: Attach type for further middleware
            return next();
        }

        // If not an admin, check if it belongs to a user
        const user = await User.findById(decoded.id).select("-password");
        if (user) {
            req.user = user; // Attach user to the request
            req.userType = "user"; // Optional: Attach type for further middleware
            return next();
        }

        // If neither, return an error
        return res.status(404).json({ message: "User not found" });
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};




// Middleware to check if the user has an admin role
exports.isAdmin = (req, res, next) => {
    if (req.user instanceof Admin) {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admins only." });
    }
};

// Middleware to check if the user has a user role (default user)
exports.isUser = (req, res, next) => {
    if (req.user instanceof User) {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Users only." });
    }
};


