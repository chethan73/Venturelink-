// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import authRoutes from './routes/authRoutes'; // Default import
// // import chatRoutes from './routes/chatRoutes';
// // import leaderboardRoutes from './routes/leaderboard';
// import sequelize from './database';

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// // app.use('/api/auth', authRoutes);
// // app.use('/api/chat', chatRoutes);
// // app.use('/api/leaderboard', leaderboardRoutes);

// // Database connection test and sync
// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connected successfully.');
//     await sequelize.sync({ alter: true });
//     console.log('Database synchronized.');
//   } catch (error) {
//     console.error('Database connection failed:', error);
//     process.exit(1);
//   }
// })();

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// backend/src/server.ts

import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import path from 'path';
import setupRoutes from './api-routes'; // Import your API routes

dotenv.config();

// Initialize Express app
const app: Application = express();

// Create HTTP server
const server = http.createServer(app);

// Middleware setup
app.use(cors({
  origin: '*', // Allow all origins (Tip: Replace with specific origin in production)
  credentials: true,
}));
app.use(express.json()); // To parse JSON bodies

// Serve static files (e.g., uploaded images/docs)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount API routes under /api
app.use('/api', setupRoutes);

// Set PORT (default to 5000 if not provided)
const PORT: number = Number(process.env.PORT) || 5000;

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Global error handling for server startup issues
server.on('error', (error: NodeJS.ErrnoException) => {
  console.error('❌ Server error:', error.message);
  process.exit(1); // Exit process on critical error
});
