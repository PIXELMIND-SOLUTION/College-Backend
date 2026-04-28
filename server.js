// import express from 'express';
// import http from 'http';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import dotenv from 'dotenv';
// import connectDatabase from './db/connectDatabase.js';
// import path from 'path'; // Import path to work with file and directory paths
// import UserRoutes from './Routes/userRoutes.js'
// import { fileURLToPath } from 'url';  // Import the fileURLToPath method
// import cloudinary from './config/cloudinary.js';
// import fileUpload from 'express-fileupload';
// import collegeRoutes from './Routes/collegeRoutes.js'
// import adminRoutes from "./Routes/adminRoutes.js"
// import courseFormRoutes from "./Routes/courseFormRoutes.js"
// import dns from "dns";   // 👈 ADD THIS
// import fs from "fs";


// // 👇 ADD THIS RIGHT HERE
// dns.setServers([
//   "8.8.8.8",
//   "8.8.4.4"
// ]);
// dotenv.config();

// const app = express();


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// // ✅ Serve static files from /uploads
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// if (!fs.existsSync("uploads/banners")) {
//   fs.mkdirSync("uploads/banners", { recursive: true });
// }


// if (!fs.existsSync("uploads/colleges")) {
//   fs.mkdirSync("uploads/colleges", { recursive: true });
// }


// if (!fs.existsSync("uploads/profile")) {
//   fs.mkdirSync("uploads/profile", { recursive: true });
// }

// app.use(cors({
//   origin: ['http://localhost:3000', 'http://31.97.206.144:7686', 'https://vidya-enrolldeleteurl.vercel.app', 'http://31.97.228.17:7686'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true
// }));

// app.options('*', cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// // Database connection
// connectDatabase();


// // Middleware to handle file uploads
// app.use(fileUpload({
//   useTempFiles: true,
//   tempFileDir: '/tmp/', // Temporary directory to store files before upload
// }));

// // Default route
// app.get("/", (req, res) => {
//     res.json({
//         status: "success",    // A key to indicate the response status
//         message: "Welcome to our college service!", // Static message
//     });
// });



// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// // Serve frontend static files (HTML, JS, CSS)


// // Create HTTP server with Express app
// const server = http.createServer(app);

// app.use('/api/users', UserRoutes);
// app.use('/api/college', collegeRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/courseform', courseFormRoutes);



// const port = process.env.PORT || 6063;

// app.listen(port, '0.0.0.0', () => {
//   console.log(`🚀 Server running on http://0.0.0.0:${port}`);
// });

// import express from 'express';
// import http from 'http';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import dotenv from 'dotenv';
// import connectDatabase from './db/connectDatabase.js';
// import path from 'path'; // Import path to work with file and directory paths
// import UserRoutes from './Routes/userRoutes.js'
// import { fileURLToPath } from 'url';  // Import the fileURLToPath method
// import cloudinary from './config/cloudinary.js';
// import fileUpload from 'express-fileupload';
// import collegeRoutes from './Routes/collegeRoutes.js'
// import adminRoutes from "./Routes/adminRoutes.js"
// import courseFormRoutes from "./Routes/courseFormRoutes.js"
// import dns from "dns";   // 👈 ADD THIS
// import fs from "fs";


// // 👇 ADD THIS RIGHT HERE
// dns.setServers([
//   "8.8.8.8",
//   "8.8.4.4"
// ]);
// dotenv.config();

// const app = express();


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// // ✅ Serve static files from /uploads
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// if (!fs.existsSync("uploads/banners")) {
//   fs.mkdirSync("uploads/banners", { recursive: true });
// }


// if (!fs.existsSync("uploads/colleges")) {
//   fs.mkdirSync("uploads/colleges", { recursive: true });
// }


// if (!fs.existsSync("uploads/profile")) {
//   fs.mkdirSync("uploads/profile", { recursive: true });
// }

// app.use(cors({
//   origin: ['http://localhost:3000', 'http://31.97.206.144:7686', 'https://vidya-enrolldeleteurl.vercel.app', 'http://31.97.228.17:7686'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true
// }));

// app.options('*', cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// // Database connection
// connectDatabase();


// // Middleware to handle file uploads
// app.use(fileUpload({
//   useTempFiles: true,
//   tempFileDir: '/tmp/', // Temporary directory to store files before upload
// }));

// // Default route
// app.get("/", (req, res) => {
//     res.json({
//         status: "success",    
//         message: "Welcome to our college service!", 
//     });
// });



// app.use(bodyParser.json());


// const server = http.createServer(app);

// app.use('/api/users', UserRoutes);
// app.use('/api/college', collegeRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/courseform', courseFormRoutes);



// const port = process.env.PORT || 6063;

// app.listen(port, '0.0.0.0', () => {
//   console.log(`🚀 Server running on http://0.0.0.0:${port}`);
// });



import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDatabase from './db/connectDatabase.js';
import path from 'path';
import UserRoutes from './Routes/userRoutes.js';
import { fileURLToPath } from 'url';
import cloudinary from './config/cloudinary.js';
import fileUpload from 'express-fileupload';
import collegeRoutes from './Routes/collegeRoutes.js';
import adminRoutes from "./Routes/adminRoutes.js";
import courseFormRoutes from "./Routes/courseFormRoutes.js";
import dns from "dns";
import fs from "fs";
import mongoose from 'mongoose'; // ✅ ADDED

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ IMPROVED: Create all upload directories dynamically
const uploadDirs = ['uploads/banners', 'uploads/colleges', 'uploads/profile', 'uploads/courses'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// ✅ CORS configuration (unchanged)
app.use(cors({
  origin: ['http://localhost:3000', 'http://31.97.206.144:7686', 'https://vidya-enrolldeleteurl.vercel.app', 'http://31.97.228.17:7686'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.options('*', cors());

// ✅ FIXED: Use express.json() instead of bodyParser (only once)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Database connection with error handling
const startServer = async () => {
  try {
    await connectDatabase();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

// ✅ File upload middleware
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: 50 * 1024 * 1024 } // ✅ ADDED file size limit
}));

// ✅ Default route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to our college service!",
  });
});

// ✅ Routes
app.use('/api/users', UserRoutes);
app.use('/api/college', collegeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/courseform', courseFormRoutes);

// ✅ NEW: 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 6063;

const server = http.createServer(app);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});

// ✅ NEW: Graceful shutdown handlers
const gracefulShutdown = async (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);
  
  server.close(async (err) => {
    if (err) {
      console.error('Error closing server:', err);
      process.exit(1);
    }
    
    try {
      await mongoose.connection.close();
      console.log('✅ MongoDB connection closed');
      process.exit(0);
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
      process.exit(1);
    }
  });
  
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// ✅ NEW: Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  gracefulShutdown('uncaughtException');
});

// ✅ NEW: Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('unhandledRejection');
});

startServer();