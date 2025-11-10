// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import http from 'http';
// import { Server } from 'socket.io';
// import path from 'path';
// import routes from './routes'; // Ensure this file exists and exports routes
// import setupRoutes from './api-routes';
// import { initializeSocket } from './socket';

// // Load environment variables from .env file
// dotenv.config();

// // Initialize Express app
// const app = express();
// const server = http.createServer(app);

// // Setup server for HTTP and WebSocket
// const { io, users } = initializeSocket(server); // Initialize socket.io



// // Middlewares
// app.use(cors({
//   origin: "*",
//   credentials: true,
// }));

// app.use(express.json());

// // Serve static files (uploads)


// // API Routes
// app.use("/api", setupRoutes(io, users));
// // Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import http from 'http';
// import { Server } from 'socket.io';
// import path from 'path';
// import cookieParser from 'cookie-parser'; // ✅ Add this
// import routes from './routes'; // Ensure this file exists and exports routes
// import setupRoutes from './api-routes'; // Ensure this imports the correct routes setup
// import { initializeSocket } from './socket'; // Ensure this function is correctly implemented

// // Load environment variables from .env file
// dotenv.config();

// // Initialize Express app
// const app = express();
// const server = http.createServer(app);

// // Setup server for HTTP and WebSocket
// const { io, users } = initializeSocket(server); // Initialize socket.io

// // ✅ Middlewares
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Use the frontend URL from .env
//   credentials: true,
// }));

// app.use(cookieParser()); // ✅ Parse cookies
// app.use(express.json()); // ✅ Parse JSON bodies

// // ✅ Serve static files (if needed for uploads or public folder)
// app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// // API Routes
// app.use("/api", setupRoutes(io, users)); // Ensure setupRoutes maps to the correct routes

// // Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

// // backend/src/index.ts (or server.ts)
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import http from "http";
// import path from "path";
// import cookieParser from "cookie-parser";
// import { initializeSocket } from "./socket";
// import setupRoutes from "./api-routes"; // Must export a function accepting (io, users)

// // Load environment variables from .env
// dotenv.config();

// // Initialize Express app
// const app = express();
// const server = http.createServer(app);

// // Initialize socket.io
// const { io, users } = initializeSocket(server);

// // Middleware
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:3000",
//     credentials: true,
//   })
// );
// app.use(cookieParser());
// app.use(express.json());

// // Serve static files
// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// // API Routes
// app.use("/api", setupRoutes(io, users)); // setupRoutes must return a Router

// // Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import path from "path";
import cookieParser from "cookie-parser";
import { initializeSocket } from "./socket";
import setupRoutes from "./api-routes"; // Make sure this file exports a function accepting (io, users)

dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Initialize socket.io and get the io instance and users
const { io, users } = initializeSocket(server);

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // CORS for the frontend
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(cookieParser());
app.use(express.json()); // Allow JSON bodies for POST requests

// Serve static files (uploads)
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); // Make sure this folder exists

// API Routes
app.use("/api", setupRoutes(io, users)); // setupRoutes should return a Router, and will use io and users

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
