const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();

// Load environment variables from .env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS with dynamic origin checking
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost for development
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    
    // Allow all Vercel deployments (for development)
    if (origin.includes('.vercel.app')) {
      return callback(null, true);
    }
    
    // Allow specific frontend URL from environment
    if (origin === process.env.FRONTEND_URL) {
      return callback(null, true);
    }
    
    // For production, you should be more specific with allowed origins
    console.log('CORS blocked origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Serve static files from the uploads directory
app.use("/uploads", express.static(uploadDir));

// Connect to the database
const dbConnect = require("./config/database");
dbConnect();

// Import routes
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const routes = require("./routes/routes");
const momentRoutes = require("./routes/momentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// Use routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/routes", routes);
app.use("/api/moments", momentRoutes);
app.use("/api/payment", paymentRoutes);

// Default route
app.get("/", (req, res) => {
  res.send(`<h1>THIS IS A HOME PAGE</h1>`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
