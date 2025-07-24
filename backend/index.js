const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();

// Load environment variables from .env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// Debug logging
console.log('Environment variables loaded:');
console.log('PORT:', PORT);
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Present' : 'Missing');

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS with dynamic origin checking
const corsOptions = {
  origin: function (origin, callback) {
    console.log('CORS check - Origin:', origin);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('CORS: Allowing request with no origin');
      return callback(null, true);
    }
    
    // Allow localhost for development
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      console.log('CORS: Allowing localhost origin');
      return callback(null, true);
    }
    
    // Allow all Vercel deployments (for development)
    if (origin.includes('.vercel.app')) {
      console.log('CORS: Allowing Vercel deployment');
      return callback(null, true);
    }
    
    // Allow specific frontend URL from environment
    if (origin === process.env.FRONTEND_URL) {
      console.log('CORS: Allowing specific frontend URL');
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

// Additional CORS headers for debugging
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

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

// Log all registered routes
console.log('Registered routes:');
console.log('- /api/admin/* (admin routes)');
console.log('- /api/user/* (user routes)');
console.log('- /api/routes/* (general routes)');
console.log('- /api/moments/* (moment routes)');
console.log('- /api/payment/* (payment routes)');

// Default route
app.get("/", (req, res) => {
  res.send(`<h1>THIS IS A HOME PAGE</h1>`);
});

// Debug route to test API
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "API is working",
    timestamp: new Date().toISOString(),
    environment: {
      PORT: PORT,
      NODE_ENV: process.env.NODE_ENV,
      FRONTEND_URL: process.env.FRONTEND_URL
    }
  });
});

// Catch-all route for debugging 404s
app.use('*', (req, res) => {
  console.log('404 - Route not found:', req.method, req.originalUrl);
  res.status(404).json({ 
    error: 'Route not found',
    method: req.method,
    url: req.originalUrl,
    availableRoutes: [
      'GET /',
      'GET /api/test',
      'POST /api/user/register',
      'POST /api/user/login',
      'GET /api/user/dashboard',
      'POST /api/admin/register',
      'POST /api/admin/login'
    ]
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
