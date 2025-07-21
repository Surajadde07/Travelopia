const User = require('../models/User');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenBlacklist = require('../config/tokenBlacklist');
require('dotenv').config();

//? new one
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};


//? new one
exports.registerUser = async (req, res) => {
    const { firstname, lastname, username, email, phone, gender, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            firstname,
            lastname,
            username,
            email,
            phone,
            gender,
            password: hashedPassword
        });

        res.status(201).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            token: generateToken(user._id, 'user')
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



//? new one
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id, 'user')
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get the logged-in user's profile
// @route   GET /api/auth/profile
// @access  Private (user or admin)
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update the logged-in user's profile
// @route   PUT /api/auth/profile
// @access  Private (user or admin)
exports.updateProfile = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.username = username || user.username;
            user.email = email || user.email;

            // If password is provided, hash the new password
            if (password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
            }

            const updatedUser = await user.save();

            // Send updated user details with a new token
            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                role: updatedUser.role,
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//? Register a New Admin
// exports.registerAdmin = async (req, res) => {
//     const { adminName, email, password } = req.body;

//     try {
//         // Check if admin already exists
//         const adminExists = await Admin.findOne({ email });
//         if (adminExists) {
//             return res.status(400).json({ message: 'Admin already exists' });
//         }

//         // Hash the password before saving to the database
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create the admin
//         const admin = await Admin.create({
//             adminName,
//             email,
//             password: hashedPassword
//         });

//         // Generate token and send response
//         res.status(201).json({
//             _id: admin._id,
//             adminName: admin.adminName,
//             email: admin.email,
//             token: generateToken(admin._id),
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

//? new one
exports.registerAdmin = async (req, res) => {
    const { adminName, email, password } = req.body;

    try {
        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            adminName,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            _id: admin._id,
            adminName: admin.adminName,
            email: admin.email,
            token: generateToken(admin._id, 'admin'),
            password
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//? Login an Admin
// exports.loginAdmin = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Check if the admin exists
//         const admin = await Admin.findOne({ email });
//         if (admin && (await bcrypt.compare(password, admin.password))) {
//             // Generate token and send response
//             res.json({
//                 _id: admin._id,
//                 adminName: admin.adminName,
//                 email: admin.email,
//                 token: generateToken(admin._id),
//             });
//         } else {
//             res.status(401).json({ message: 'Invalid email or password' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

//? new one

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        if (admin && (await bcrypt.compare(password, admin.password))) {
            res.json({
                _id: admin._id,
                adminName: admin.adminName,
                email: admin.email,
                token: generateToken(admin._id, 'admin')
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//! logout function
exports.logout = (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
        tokenBlacklist.add(token);  // Add token to the blacklist
    }

    res.status(200).json({ success: true, message: "Successfully logged out" });
};