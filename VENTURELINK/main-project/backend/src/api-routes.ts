
import express, { Request, Response, NextFunction } from "express";

// Define the AuthenticatedRequest interface
interface AuthenticatedRequest extends Request {
    user_id?: string;
}
import { Server } from "socket.io";
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
import multer from 'multer';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import cors from 'cors';
import { QueryTypes } from 'sequelize'; // Import QueryTypes separately
import pool from './database'; 
import fs from "fs";// Import the pool object
import http from "http";
import Message from "../models/message2"; // Import the message model
import { Message2 } from "./models/Message2"; // adjust path
import { Op } from "sequelize"; // needed for OR conditions
import cookieParser from 'cookie-parser';
// import { Server as Server } from 'socket.io'; // Import SocketServer for socket.io
import { Resend } from 'resend';

import axios from 'axios'; // Ensure axios is installed






dotenv.config(); 
const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_PORT } = process.env;
const DATABASE_URL = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: false,  // Optional: turn off SQL logging for cleaner output
});



// Define types for the query result
interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  blockedUsers: number;
  newUsers: number;
  totalProjects: number;
}

interface RoleBreakdown {
  role: string;
  count: number;
}

const router = express.Router();

export default function setupRoutes(io: Server, users: Record<string, string>) {




  const resend = new Resend('re_expKx9nG_DpbFzDgBSy7Y7wsz9QhAB74J'); // Replace with your API key

const sendWelcomeEmail = async (email: string, fullName: string) => {
  try {
    await resend.emails.send({
       from: 'VentureLink <onboarding@resend.dev>', // After domain verification
      to: email,
      subject: 'Welcome to the VentureLink Family! 🚀',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hello ${fullName},</h2>
          <p>🎉 Welcome to <strong>VentureLink</strong> — your gateway to innovation and opportunity.</p>
          <p>We're thrilled to have you on board! You can now explore startups, connect with investors, and build your dream ventures.</p>
          <p>If you need any help, reply to this email or visit our support page.</p>
          <br/>
          <p>Warm regards,<br/>The VentureLink Team 💡</p>
        </div>
      `,
    });
    console.log('✅ Welcome email sent to:', email);
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
  }
};



    router.post('/register', async (req: Request, res: Response) => {
      const { full_name, email, password, number, role, sector } = req.body;
  
      try {
          // Check if the email already exists
          const existingUser: any[] = await pool.query(
              "SELECT email FROM users2 WHERE email = :email",
              { replacements: { email }, type: QueryTypes.SELECT }
          );
  
          if (existingUser.length > 0) {
              return res.status(400).json({ message: "Email already exists" });
          }
  
          // Hash the password before storing
          const hashedPassword = await bcrypt.hash(password, 10);
  
          // Insert user into the database with parameterized query
          const [result] = await pool.query(
              `INSERT INTO users2 (full_name, email, password, number, role, sector) 
               VALUES (:full_name, :email, :password, :number, :role, :sector) 
               RETURNING *`,
              { 
                  replacements: { 
                      full_name, 
                      email, 
                      password: hashedPassword, 
                      number, 
                      role, 
                      sector 
                  },
                  type: QueryTypes.INSERT
              }
          );
  
  //        // Send welcome email after successful registration
    await sendWelcomeEmail(email, full_name);

    res.status(201).json({
      message: 'User registered successfully. Welcome email sent.',
      data: result,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: (error as Error).message });
  }
});
      
// router.post('/register', async (req: Request, res: Response) => {
//   const { full_name, email, password, number, role, sector } = req.body;

//   try {
//     const existingUser: any[] = await pool.query(
//       'SELECT email FROM users2 WHERE email = :email',
//       {
//         replacements: { email },
//         type: QueryTypes.SELECT,
//       }
//     );

//     if (existingUser.length > 0) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const [result]: any = await pool.query(
//       `INSERT INTO users2 (full_name, email, password, number, role, sector) 
//        VALUES (:full_name, :email, :password, :number, :role, :sector) 
//        RETURNING *`,
//       {
//         replacements: {
//           full_name,
//           email,
//           password: hashedPassword,
//           number,
//           role,
//           sector,
//         },
//         type: QueryTypes.INSERT,
//       }
//     );

//     // Send welcome email after successful registration
//     await sendWelcomeEmail(email, full_name);

//     res.status(201).json({
//       message: 'User registered successfully. Welcome email sent.',
//       data: result,
//     });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ error: (error as Error).message });
//   }
// });



      // // Login Route
      // router.post("/login", async (req: Request, res: Response) => {
      //   const { email, password } = req.body;
      
      //   console.log("Received login request with email:", email, "password:", password);
      
      //   try {
      //     // Fetch user from DB
      //     const users: any[] = await pool.query(
      //       "SELECT * FROM users2 WHERE email = ?",
      //       { replacements: [email], type: QueryTypes.SELECT }
      //     );
      
      //     console.log("Query result:", users); // Log database result
      
      //     if (users.length === 0) {
      //       console.log("User not found in database");
      //       return res.status(400).json({ message: "Invalid email or password" });
      //     }
      
      //     const user = users[0];
      
      //     console.log("User found:", user);
      
      //     // Check if user is blocked
      //     if (user.blocked) {
      //       console.log("Blocked user attempted login:", email);
      //       return res.status(403).json({ message: "Your account is blocked. Contact support." });
      //     }
      
      //     // Check password
      //     console.log("Comparing passwords...");
      //     const isMatch = await bcrypt.compare(password, user.password);
      //     console.log("Password match result:", isMatch);
      
      //     if (!isMatch) {
      //       console.log("Incorrect password for user:", email);
      //       return res.status(400).json({ message: "Invalid email or password" });
      //     }
      
      //     // Generate JWT
      //     console.log("Generating JWT...");
      //     const token = jwt.sign(
      //       { id: user.id, email: user.email, role: user.role },
      //       process.env.JWT_SECRET!,
      //       { expiresIn: "1d" }
      //     );
      
      //     console.log("Login successful for:", email);
      //     res.status(200).json({ message: "Login success", token, user });
      //   } catch (error) {
      //     console.error("Error during login:", error);
      //     res.status(500).json({ error: (error as Error).message });
      //   }
      // });
      
      // Use cookie-parser middleware
// Use cookie parser middleware for parsing cookies
router.use(cookieParser());

// Login Route
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log("Received login request with email:", email, "password:", password);

  try {
    // Fetch user from DB
    const users: any[] = await pool.query(
      "SELECT * FROM users2 WHERE email = ?",
      { replacements: [email], type: QueryTypes.SELECT }
    );

    console.log("Query result:", users);

    if (users.length === 0) {
      console.log("User not found in database");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = users[0];

    console.log("User found:", user);

    // Check if user is blocked
    if (user.blocked) {
      console.log("Blocked user attempted login:", email);
      return res.status(403).json({ message: "Your account is blocked. Contact support." });
    }

    // Check password
    console.log("Comparing passwords...");
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("Incorrect password for user:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    console.log("Generating JWT...");
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!, // Ensure your JWT_SECRET is set in .env
      { expiresIn: "1d" }
    );

    // Send JWT as a cookie
    res.cookie("access_token", token, {
      httpOnly: true, // Helps prevent XSS attacks
      secure: process.env.NODE_ENV === 'production', // Secure cookie in production (requires HTTPS)
      sameSite: "strict", // Restrict cookie to same-site requests
      maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
    });

    console.log("Login successful for:", email);
    // Send the token and user details in the response
    res.status(200).json({
      message: "Login success",
      token, // The token is already in the cookie
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

// Logout Route (Clears JWT cookie)
router.post('/logout', (req: Request, res: Response) => {
  // Clear the access_token cookie on logout
  res.clearCookie('access_token');
  res.status(200).json({ message: "Logged out successfully" });
});

router.get("/me", async (req: Request, res: Response) => {
  try {
    // Get the JWT token from cookies
    const token = req.cookies.access_token;

    // If there's no token, return an unauthorized response
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token found" });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; email: string; role: string };

    // Fetch the user data from the database using the decoded ID
    const user = await pool.query(
      "SELECT id, email, role FROM users2 WHERE id = ?",
      { replacements: [decoded.id], type: QueryTypes.SELECT }
    );

    // If user not found, return a 404 response
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user data in the response
    res.status(200).json(user[0]);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token or other error" });
  }
});

// Use cookie parser to read cookies
router.use(cookieParser());

// Configure CORS with credentials
const corsOptions = {
  origin: 'http://localhost:3000',  // Your React app's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies and credentials
};

// Use CORS middleware with the options
router.use(cors(corsOptions));

// Other middlewares (body parser, etc.)
router.use(express.json());
                    
      // ✅ Get All Users
      router.get('/getall', async (req: Request, res: Response) => {
        try {
          const result = await pool.query(`SELECT * FROM users2;`);
          res.status(200).json({ message: 'Users retrieved successfully', data: result[0] });
        } catch (error) {
          res.status(500).json({ error: (error as Error).message });
        }
      });

      // ✅ Fetch User Profile
      router.get("/user/:id", async (req, res) => {
        try {
          const { id } = req.params;
          if (!id) return res.status(400).json({ message: "User ID is required" });
      
          const user = await pool.query("SELECT * FROM users2 WHERE id = ?", {
            replacements: [id],
            type: QueryTypes.SELECT,
          });
      
          if (!user.length) return res.status(404).json({ message: "User not found" });
      
          res.status(200).json(user[0]);
        } catch (error) {
          console.error("Error fetching user:", error);
          res.status(500).json({ message: "Failed to retrieve user" });
        }
      });
      


      // ✅ Get User by ID
      router.get('/register/:id', async (req: Request, res: Response) => {
        const userId = req.params.id;
      
        try {
          const result = await pool.query(`SELECT * FROM users2 WHERE id = '${userId}'`);
          const user = result[0][0];
      
          if (user) {
            res.status(200).json(user);
          } else {
            res.status(404).json({ message: 'User not found' });
          }
        } catch (error) {
          res.status(500).json({ error: (error as Error).message });
        }
      });
      
      

 // ✅ File Upload (Handling Images)
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, 'uploads/'); // Save files in the 'uploads' directory
  },
  filename: (req: any, file: any, cb: any) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// // // POST route for file upload
router.post('/upload', upload.single('image'), async (req: any, res: Response) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded or invalid file type' });
    }

    // Get the file path and additional data from the request
    const { name, description, category, sector, fundingneeds, userId } = req.body;
    const filePath = req.file.filename;

    // Validate required fields
    if (!sector || !fundingneeds) {
      return res.status(400).json({
        error: sector ? 'Funding needs is required' : 'Sector is required',
      });
    }

    const query = `
    INSERT INTO uploads (name, description, category, file_path, sector, fundingneeds, user_id)
    VALUES (:name, :description, :category, :file_path, :sector, :fundingneeds, :user_id)
    RETURNING *;
  `;

    const values = {
      name,
      description,
      category,
      file_path: filePath,
      sector,
      fundingneeds, // ✅ Ensure fundingneeds is not undefined
      user_id: userId, // ✅ Include user ID
    };

    const result = await sequelize.query(query, {
      replacements: values,
      type: QueryTypes.INSERT,
    });

    const data = result[0];
    res.status(200).json({
      message: 'File uploaded successfully',
      file: data,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});

// // GET uploads by user_id
// router.get('/uploads', async (req, res) => {
//   const user_id = req.query.user_id as string;

//   if (!user_id) {
//     return res.status(400).json({ error: 'user_id is required' });
//   }

//   try {
//     const uploads = await sequelize.query(
//       'SELECT * FROM uploads WHERE user_id = :user_id ORDER BY timestamp DESC',
//       {
//         replacements: { user_id: parseInt(user_id) },
//         type: QueryTypes.SELECT,
//       }
//     );

//     res.json({ uploads });
//   } catch (error) {
//     console.error('Error fetching uploads:', error); // this is key
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



// POST - Send a new message
router.post('/messages', async (req: Request, res: Response) => {
  const { sender_id, receiver_id, message } = req.body;

  if (!sender_id || !receiver_id || !message) {
    return res.status(400).json({ error: 'Missing required fields: sender_id, receiver_id, message' });
  }

  try {
    // Create a new message using Sequelize's create method
    const newMessage = await Message2.create({
      sender_id,
      receiver_id,
      message,
      timestamp: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Return the new message
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});     

// GET - Fetch messages between two users
router.get('/messages', async (req: Request, res: Response) => {
  const { user1, user2 } = req.query;

  if (!user1 || !user2) {
    return res.status(400).json({ error: 'Both user1 and user2 are required' });
  }

  try {
    // Fetch messages between user1 and user2 using Sequelize's findAll method
    const messages = await Message2.findAll({
      where: {
        [Op.or]: [
          { sender_id: user1, receiver_id: user2 },
          { sender_id: user2, receiver_id: user1 },
        ],
      },
      order: [['timestamp', 'ASC']], // Order messages by timestamp ascending
    });

    res.status(200).json(messages); // Send back the messages
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});








router.post('/upload-rating', async (req, res) => {
  try {
    const { id, rating } = req.body;

    // Check for required fields
    if (!id || rating === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Step 1: Check if the rating already exists for the file
    const existingRating = await sequelize.query(
      'SELECT * FROM uploads WHERE id = $1',
      {
        bind: [id],
        type: QueryTypes.SELECT,
      }
    );

    // Step 2: If rating exists, update the rating
    if (existingRating && existingRating.length > 0) {
      await sequelize.query(
        'UPDATE uploads SET rating = $1 WHERE id = $2',
        {
          bind: [rating, id],
          type: QueryTypes.UPDATE,
        }
      );
      return res.status(200).json({ message: 'Rating updated successfully' });
    } else {
      // If no record found, create a new one (if this is what you want)
      await sequelize.query(
        'INSERT INTO uploads (id, rating) VALUES ($1, $2)',
        {
          bind: [id, rating],
          type: QueryTypes.INSERT,
        }
      );
      return res.status(200).json({ message: 'Rating saved successfully' });
    }
  } catch (error) {
    console.error('Error handling upload rating:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Assuming `id` and `rating` exist in the `uploads` table
router.get('/getRatings', async (req, res) => {
  try {
    const ratings = await sequelize.query(
      'SELECT id, rating FROM uploads',
      { type: QueryTypes.SELECT }
    );

    // Convert the array of ratings into a key-value map { id: rating }
    const ratingsMap = ratings.reduce((acc: any, curr: any) => {
      acc[curr.id] = curr.rating;
      return acc;
    }, {});

    return res.json(ratingsMap);
  } catch (error) {
    console.error('Error fetching ratings:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



      router.get('/uploads/:id', async (req: any, res: Response) => {
        try {
          const filePa = req.params.id;
          const backendDir = path.resolve(__dirname, '..')
          const imagePath = path.join(backendDir, ".", "uploads", filePa);
          // const imagePath = path.join(re, filePa);
          if (filePa.includes(".pdf")){
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `inline; filename="${filePa}"`);
            res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
            res.setHeader("Pragma", "no-cache");
            res.setHeader("Expires", "0");
          }
          console.log("header" , res.getHeaders())
          if (fs.existsSync(imagePath)) {
            res.sendFile(imagePath);
        } else {
          console.log(imagePath)
        }
        } catch (error) {
          console.error('Error uploading file:', error);
          res.status(500).json({ error: 'An error occurred while uploading the file' });
        }
      });
      
      router.get('/getallFiles', async (req: Request, res: Response) => {
        try {
          // Query to fetch all files
          const [results] = await pool.query('SELECT * FROM uploads');
      
          // Check if any results are returned
          if (results.length > 0) {
            res.status(200).json({ message: 'Files retrieved successfully', data: results });
          } else {
            res.status(404).json({ message: 'No files found' });
          }
        } catch (error) {
          // Catch any errors and send them in the response
          res.status(500).json({ error: (error as Error).message });
        }
      });

      // Endpoint to fetch files for a specific user based on user_id
router.get('/getallFiles12', async (req: Request, res: Response) => {
  const { user_id } = req.query;  // Fetch the user_id from the query parameters

  // Validate the user_id exists
  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required' });
  }

  try {
    // Execute the query with a parameterized user_id to prevent SQL injection
    const uploads = await pool.query(
      'SELECT * FROM uploads WHERE user_id = :user_id',
      {
        replacements: { user_id },
        type: QueryTypes.SELECT
      }
    ) as any[];

    // If there are results, send them back
    if (uploads && uploads.length > 0) {
      res.status(200).json({
        message: 'Files retrieved successfully',
        data: uploads,
      });
    } else {
      // If no uploads were found, return a 404 response
      res.status(404).json({ message: 'No files found for this user' });
    }
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error fetching uploads:', error);
    res.status(500).json({ error: (error as Error).message });
  }
});


      

// Get tasks by date
router.get('/getasks', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM tasks;`);
    res.status(200).json({ message: 'tasks are displayed', data: result[0] });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Add a new task
router.post('/tasks', async (req: Request, res: Response) => {
  console.log('Received request body:', req.body); // Debugging log

  const { title, discription, time, date } = req.body;

  try {
    const result = await pool.query(`
      INSERT INTO tasks (title, discription, time, date) 
      VALUES ('${title}', '${discription}', '${time}', '${date}') 
      RETURNING *`
    );

    console.log('Inserted task:', result[0]); // Debugging log

    res.status(201).json({ message: 'task added ', data: result[0] });
  } catch (error) {
    console.error('Error inserting task:', error);
    res.status(500).json({ error: (error as Error).message });
  }
});

// delete tasks



router.delete('/tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`DELETE FROM tasks WHERE id = ${id} RETURNING *`);

    // Ensure rows exist in the result
    if (!result[0] || result[0].length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted', data: result[0][0] });
  } catch (error) {
    console.error('Delete Task Error:', error);
    res.status(500).json({ error: (error as Error).message });
  }
});




router.post('/support', async (req: Request, res: Response) => {
  const { name, email, message, role } = req.body;

  try {
      const [result] = await pool.query(
      `INSERT INTO support (name, email, message, role) 
       VALUES (?, ?, ?, ?) 
       RETURNING *`,
      {
        replacements: [name, email, message, role], // Use parameterized query to prevent SQL injection
        type: QueryTypes.RAW, // Use RAW for INSERT operations
      }
    );

    console.log('Message received:', result); // Debugging log

    res.status(201).json({ message: 'Message sent to admin', data: result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: (error as Error).message });
  }
});

// Admin route to fetch all support messages
router.get('/getsupport', async (req: Request, res: Response) => {
  try {
    const messages = await pool.query(
      `SELECT id, name, email, message, role, created_at FROM support ORDER BY created_at DESC`,
      {
        type: QueryTypes.SELECT, // Fetch data
      }
    );

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching support messages:', error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.get('/getanalytics', async (req: Request, res: Response) => {
  try {
    // Fetching total users
    const totalUsersResult = await pool.query<{ totalUsers: number }>(
      `SELECT  COUNT(*) as totalUsers FROM users2`,
      {
        type: QueryTypes.SELECT, 
      }
    );
    const totalUsers = await sequelize.query(`
      SELECT full_name, COUNT(*) as totalUsers 
      FROM users2 
      GROUP BY full_name;
    `, { type: QueryTypes.SELECT });
    

    
    // Fetching new users created in the last 30 days
    const newUsersResult = await pool.query<{ newUsers: number }>(
      `SELECT COUNT(*) as newUsers FROM users2 WHERE created_at > NOW() - INTERVAL '30 days'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    const newUsers = newUsersResult[0]?.newUsers || 0;

    // Fetching total projects uploaded
    const totalProjectsResult = await pool.query<{ totalProjects: number }>(
      `SELECT COUNT(*) as totalProjects FROM uploads`,
      {
        type: QueryTypes.SELECT,
      }
    );
    

    const totalProjects = await sequelize.query(`
      SELECT name, COUNT(*) as totalProject 
      FROM uploads 
      GROUP BY name;
    `, { type: QueryTypes.SELECT });

    // Fetching role breakdown
    const roleBreakdownResult = await pool.query<{ role: string, count: number }[]>(
      `SELECT role, COUNT(*) as count FROM users2 GROUP BY role`,
      {
        type: QueryTypes.SELECT,
      }
    );

    // Respond with the analytics data
    res.status(200).json({
      success: true,
      totalUsers,
      // activeUsers,
      //blockedUsers,
      newUsers,
      totalProjects,
      roleBreakdown: roleBreakdownResult, // Returning the role breakdown
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    // Handle errors properly and send the error message to the client
    res.status(500).json({
      success: false,
      error: (error instanceof Error ? error.message : 'Internal server error'),
    });
  }
});


// ✅ Get All Users API
router.get("/getall", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users2", {
      type: QueryTypes.SELECT,
    });

    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// ✅ Block/Unblock User API
router.post("/users/blockUser/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch user correctly
    interface User {
      id: number;
      blocked: boolean;
      [key: string]: any; // for other properties
    }

    const users = await pool.query<User>("SELECT * FROM users2 WHERE id = ?", {
      replacements: [id],
      type: QueryTypes.SELECT,
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0] as User;
    const newBlockedStatus = !user.blocked;

    // Update user block status
    await pool.query("UPDATE users2 SET blocked = ? WHERE id = ?", {
      replacements: [newBlockedStatus, id],
      type: QueryTypes.UPDATE,
    });

    res.status(200).json({
      message: `User ${newBlockedStatus ? "blocked" : "unblocked"} successfully`,
      blocked: newBlockedStatus,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});





router.post("/support-message", async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await sequelize.query(
      `INSERT INTO support_messages (name, email, message) VALUES (?, ?, ?) RETURNING *`,
      {
        replacements: [name, email, message],
        type: QueryTypes.INSERT,
      }
    );

    // Ensure result contains data
    if (result[0]) {
      res.status(201).json({ message: "Message sent successfully", data: result[0] });
    } else {
      res.status(500).json({ error: "Failed to send message" });
    }

  } catch (error) {
    console.error("Error storing support message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
  



router.get('/getall-support', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT name, email, message FROM support_messages;`);

    res.status(200).json({
      message: 'Support messages retrieved successfully',
      data: result[0], // Access the first element which contains the rows
    });
  } catch (error) {
    console.error('Error fetching support messages:', error);
    res.status(500).json({ error: (error as Error).message });
  }
});







// Save a new message
router.post("/api/messages", async (req, res) => {
  const { sender_id, receiver_id, message } = req.body;

  if (!sender_id || !receiver_id || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const saved = await Message2.create({
      sender_id,
      receiver_id,
      message,
      timestamp: new Date(),
      updatedAt: new Date(),
    });

    res.status(200).json({ success: true, data: saved });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ success: false, error: "Failed to save message" });
  }
});


// Fetch messages between two users
router.get("/api/messages", async (req, res) => {
  const { user1, user2 } = req.query;

  if (!user1 || !user2) {
    return res.status(400).json({ error: "Missing query parameters" });
  }

  try {
    const messages = await Message2.findAll({
      where: {
        [Op.or]: [
          { sender_id: user1, receiver_id: user2 },
          { sender_id: user2, receiver_id: user1 },
        ],
      },
      order: [["timestamp", "ASC"]],
    });

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, error: "Failed to fetch messages" });
  }
});

// // GET combined user_id and upload_id
// router.get('/combined-ids', async (req, res) => {
//   try {
//     const query = `
//       SELECT 
//         u.id AS user_id,
//         up.id AS upload_id
//       FROM (
//         SELECT id, ROW_NUMBER() OVER (ORDER BY id) AS rn FROM public.users2
//       ) u
//       JOIN (
//         SELECT id, ROW_NUMBER() OVER (ORDER BY id) AS rn FROM public.uploads
//       ) up
//       ON u.rn = up.rn;
//     `;

//     // Execute the query using sequelize with the correct options
//     const result = await sequelize.query(query, {
//       type: QueryTypes.SELECT,
//     });

//     // Send the result as JSON response
//     res.status(200).json(result);
//   } catch (error) {
//     console.error('Error fetching combined IDs:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// Backend route to fetch user data with their uploads based on user ID
router.get('/user-uploads/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // SQL query to fetch user and upload data based on userId
    const query = `
      SELECT 
        u.id AS user_id,
        u.full_name,
        u.email,
        u.role,
        u.sector AS user_sector,
        u.created_at AS user_created_at,
        u.updated_at AS user_updated_at,
        u.blocked AS user_blocked,
        up.id AS upload_id,
        up.name AS file_name,
        up.description AS file_description,
        up.category AS file_category,
        up.file_path,
        up.uploaded_at,
        up.sector AS upload_sector,
        up.fundingneeds,
        up.rating
      FROM public.users2 u
      JOIN public.uploads up ON u.id = up.uploaded_by
      WHERE u.id = :userId;
    `;

    // Execute the query with the userId parameter
    const result = await sequelize.query(query, {
      replacements: { userId },
      type: QueryTypes.SELECT,
    });

    if (result.length === 0) {
      return res.status(404).json({ message: 'No data found for this user' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching user and uploads:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// In your /api/connect route

// // POST /api/update-status
// router.post('/update-status', async (req, res) => {
//   const { uploadId, userId, status } = req.body;

//   if (!uploadId || !userId || !status) {
//     return res.status(400).json({ message: 'Missing uploadId, userId, or status' });
//   }

//   try {
//     // Check if connection already exists
//     const [existing] = await sequelize.query(
//       'SELECT * FROM connections WHERE upload_id = :uploadId AND user_id = :userId',
//       {
//         replacements: { uploadId, userId },
//         type: QueryTypes.SELECT,
//       }
//     );

//     let result;

//     if (existing) {
//       // Update existing connection
//       result = await sequelize.query(
//         `UPDATE connections
//          SET status = :status
//          WHERE upload_id = :uploadId AND user_id = :userId
//          RETURNING *`,
//         {
//           replacements: { uploadId, userId, status },
//           type: QueryTypes.UPDATE,
//         }
//       );
//     } else {
//       // Insert new connection
//       result = await sequelize.query(
//         `INSERT INTO connections (upload_id, user_id, status)
//          VALUES (:uploadId, :userId, :status)
//          RETURNING *`,
//         {
//           replacements: { uploadId, userId, status },
//           type: QueryTypes.INSERT,
//         }
//       );
//     }

//     res.status(200).json({ message: 'Connection status updated', data: result[0] });
//   } catch (err) {
//     console.error('Error updating connection status:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// POST /api/update-status
router.post('/update-status', async (req, res) => {
  const { uploadId, userId, status } = req.body;

  if (!uploadId || !userId || !status) {
    return res.status(400).json({ message: 'Missing uploadId, userId, or status' });
  }

  try {
    // Check if a connection already exists
    const [existing] = await sequelize.query(
      `SELECT * FROM connections WHERE upload_id = :uploadId AND user_id = :userId LIMIT 1`,
      {
        replacements: { uploadId, userId },
        type: QueryTypes.SELECT,
      }
    );

    let result;

    if (existing) {
      // Update existing connection status
      const updateResult = await sequelize.query(
        `UPDATE connections
         SET status = :status
         WHERE upload_id = :uploadId AND user_id = :userId
         RETURNING *`,
        {
          replacements: { uploadId, userId, status },
          type: QueryTypes.UPDATE,
        }
      ) as unknown as [any[], unknown];

      result = updateResult[0];
    } else {
      // Create new connection request
      const insertResult = await sequelize.query(
        `INSERT INTO connections (upload_id, user_id, status)
         VALUES (:uploadId, :userId, :status)
         RETURNING *`,
        {
          replacements: { uploadId, userId, status },
          type: QueryTypes.INSERT,
        }
      ) as unknown as [any[], unknown];

      result = insertResult[0];
    }

    res.status(200).json({
      message: 'Connection status updated successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error updating connection status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





// router.get('/api/getConnectionsWithDetails', async (req: Request, res: Response) => {
//   try {
//     const userId = req.query.user_id;

//     if (!userId) {
//       return res.status(400).json({ error: 'user_id is required' });
//     }

//     const result = await pool.query(
//       `
//       SELECT * FROM public.connections
//       WHERE user_id = :userId;
//       `,
//       {
//         replacements: { userId },
//         type: QueryTypes.SELECT
//       }
//     );

//     res.json({
//       message: 'All connection data fetched successfully',
//       data: result,
//     });
//   } catch (error) {
//     console.error('Error fetching all connection data:', error);
//     res.status(500).json({
//       error: error instanceof Error ? error.message : 'Unknown server error',
//     });
//   }
// });


router.get('/getall-support', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT name, email, message FROM support_messages;`);

    res.status(200).json({
      message: 'Support messages retrieved successfully',
      data: result[0], // Access the first element which contains the rows
    });
  } catch (error) {
    console.error('Error fetching support messages:', error);
    res.status(500).json({ error: (error as Error).message });
  }
});



router.get("/getConnectionsWithDetails", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        c.id,
        c.user_id AS sender_id,
        u1.full_name AS sender_name,
        c.upload_id,
        up.fundingneeds,
        up.user_id AS upload_owner_id,
        u2.full_name AS upload_owner_name,
        c.status,
        c.created_at
      FROM connections c
      JOIN users2 u1 ON c.user_id = u1.id
      JOIN uploads up ON c.upload_id = up.id
      JOIN users2 u2 ON up.user_id = u2.id
      ORDER BY c.created_at DESC;
    `);

    res.status(200).json({
      message: "All connection data fetched successfully",
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching connections:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});






// // Define the route to fetch connected investors from the uploads table
// router.get('/api/connected-investors/:userId/:selectedUserId', async (req: Request, res: Response) => {
//   const { userId, selectedUserId } = req.params;

//   try {
//     // Query the uploads table to check the connection between users and fetch required fields
//     const result = await pool.query(
//       `SELECT id, name, description, category, file_path, uploaded_at, sector, fundingneeds, rating, user_id, status 
//        FROM public.uploads 
//        WHERE (user_id = :userId AND selected_user_id = :selectedUserId OR user_id = :selectedUserId AND selected_user_id = :userId)
//        AND status = :status`,
//       {
//         replacements: { userId, selectedUserId, status: 'connected' },
//         type: QueryTypes.SELECT
//       }
//     );

//     if (result.length > 0) {
//       // If matching records are found, return the result
//       res.json({ connectedUploads: result });
//     } else {
//       // No connected uploads found
//       res.status(404).json({ message: 'No connected uploads found' });
//     }
//   } catch (err) {
//     console.error('Error fetching connected uploads:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });



// // Route to update the connection status (accept or reject)
// router.put('/api/connect/:id', async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   if (!status || !['pending', 'accepted', 'rejected'].includes(status)) {
//       return res.status(400).json({ message: 'Valid status (pending, accepted, rejected) is required' });
//   }

//   try {
//       // Update the connection status in the database
//       const result = await pool.query(
//           'UPDATE connections SET status = :status WHERE id = :id RETURNING *',
//           {
//               replacements: { status, id },
//               type: QueryTypes.UPDATE
//           }
//       );

//       // Again, `result` will be an array, so extract the first item
//       const [updateResult] = result as any[];
//       if (!updateResult || !Array.isArray(updateResult) || updateResult.length === 0) {
//           return res.status(404).json({ message: 'Connection not found' });
//       }

//       const updatedConnection = updateResult[0]; // Get the updated connection data

//       return res.status(200).json({ message: 'Connection status updated', updatedConnection });
//   } catch (error) {
//       console.error('Error updating connection status:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//   }
// });


router.post('/api/upload-rating', async (req, res) => {
  console.log('Received body:', req.body);
  const { user_id, upload_id, rating } = req.body;

  if (!user_id || !upload_id || typeof rating !== 'number') {
    return res.status(400).json({ success: false, message: 'Invalid input' });
  }

  try {
    await pool.query(`
      INSERT INTO ratings (user_id, upload_id, rating)
      VALUES (:user_id, :upload_id, :rating)
      ON CONFLICT (user_id, upload_id)
      DO UPDATE SET rating = EXCLUDED.rating
    `, {
      replacements: { user_id, upload_id, rating },
      type: QueryTypes.INSERT,
    });

    res.json({ success: true, message: 'Rating saved' });
  } catch (err) {
    console.error('Rating error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});




// DELETE file by id and user_id
router.delete('/deleteFile/:fileId/:userId', async (req, res) => {
  const { fileId, userId } = req.params;

  try {
    // SQL query to delete the file from the uploads table
    const result = await sequelize.query(
      `DELETE FROM public.uploads WHERE id = $1 AND user_id = $2 RETURNING *`,
      {
        bind: [fileId, userId],
        type: QueryTypes.SELECT, // Use SELECT to return data after deletion
      }
    );

    // Check if a file was deleted (result will be an array)
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'File not found or you are not authorized to delete this file',
      });
    }

    // Respond with the deleted file's details
    res.json({
      success: true,
      message: 'File deleted successfully',
      deletedFile: result[0], // The deleted file's details
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});




// // ✅ Update connection status (only if it already exists)
// router.post('/update-status', async (req: Request, res: Response) => {
//   const { uploadId, userId, targetUserId, status } = req.body;

//   if (!['Accepted', 'Rejected'].includes(status)) {
//     return res.status(400).json({ message: 'Invalid status value' });
//   }

//   try {
//     // Check if the connection already exists (inserted by the connect button)
//     const [connection] = await sequelize.query(
//       `SELECT * FROM connections
//        WHERE upload_id = :uploadId AND user_id = :userId AND target_user_id = :targetUserId`,
//       {
//         replacements: { uploadId, userId, targetUserId },
//         type: QueryTypes.SELECT,
//       }
//     );

//     if (!connection) {
//       return res.status(404).json({ message: 'Connection request not found' });
//     }

//     // Update the status of the existing connection
//     await sequelize.query(
//       `UPDATE connections
//        SET status = :status
//        WHERE upload_id = :uploadId AND user_id = :userId AND target_user_id = :targetUserId`,
//       {
//         replacements: { uploadId, userId, targetUserId, status },
//         type: QueryTypes.UPDATE,
//       }
//     );

//     return res.status(200).json({ message: 'Connection status updated successfully' });
//   } catch (error) {
//     console.error('Error updating connection status:', error);
//     return res.status(500).json({ message: 'Server error updating connection' });
//   }
// });

// ✅ Insert or update connection
router.post('/update-status', async (req: Request, res: Response) => {
  const { uploadId, userId, targetUserId, status } = req.body;

  if (!['Requested', 'Accepted', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    // Check if a connection already exists
    const [connection] = await sequelize.query(
      `SELECT * FROM connections
       WHERE upload_id = :uploadId AND user_id = :userId AND target_user_id = :targetUserId`,
      {
        replacements: { uploadId, userId, targetUserId },
        type: QueryTypes.SELECT,
      }
    );

    if (connection) {
      // ✅ Update existing connection
      await sequelize.query(
        `UPDATE connections
         SET status = :status,
             receiver_id = :receiverId
         WHERE upload_id = :uploadId AND user_id = :userId AND target_user_id = :targetUserId`,
        {
          replacements: {
            uploadId,
            userId,
            targetUserId,
            status,
            receiverId: targetUserId,
          },
          type: QueryTypes.UPDATE,
        }
      );
    } else {
      // ✅ Insert new connection
      await sequelize.query(
        `INSERT INTO connections (upload_id, user_id, target_user_id, receiver_id, status, created_at)
         VALUES (:uploadId, :userId, :targetUserId, :receiverId, :status, NOW())`,
        {
          replacements: {
            uploadId,
            userId,
            targetUserId,
            receiverId: targetUserId,
            status,
          },
          type: QueryTypes.INSERT,
        }
      );
    }

    return res.status(200).json({ message: 'Connection saved successfully' });
  } catch (error) {
    console.error('Error saving connection:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});


// ✅ Get all connections
router.get('/connections', async (req: Request, res: Response) => {
  const userId = req.query.userId; // Get userId from query parameter

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Fetch all uploads where the status is 'pending' and the user is either the requester or owner
    const connections: any[] = await pool.query(
      'SELECT f.id, f.name, f.description, f.category, f.file_path, f.uploaded_at, f.sector, f.fundingneeds, f.rating, f.user_id, f.status, u.name AS owner_name ' +
      'FROM public.uploads f ' +
      'JOIN public.users u ON f.user_id = u.id ' +
      'WHERE f.status = ? AND (f.user_id = ? OR f.requester_id = ?)',
      {
        replacements: ['pending', userId, userId],
        type: QueryTypes.SELECT
      }
    );

    res.status(200).json(connections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch connections' });
  }
});


router.post("/update-connection-status", async (req, res) => {
  const { userId, uploadId, newStatus } = req.body;

  if (!userId || !uploadId || !newStatus) {
    return res.status(400).json({ message: "Missing userId, uploadId or newStatus" });
  }

  try {
    const [result] = await sequelize.query(
      `UPDATE connections 
       SET status = :newStatus 
       WHERE upload_id = :uploadId AND user_id = :userId`,
      {
        replacements: { newStatus, uploadId, userId },
      }
    );

    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Sequelize error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET connection status (Accepted or Rejected) for a user
router.get('/getConnectionStatusByUser/:userId', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid userId parameter' });
  }

  try {
    const results = await sequelize.query(
      `SELECT upload_id, status
       FROM connections
       WHERE user_id = :userId
         AND status IN ('Accepted', 'Rejected')`,
      {
        replacements: { userId },
        type: QueryTypes.SELECT,
      }
    );

    return res.json(results);
  } catch (error) {
    console.error('Error fetching connection status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});




// // ✅ Update connection status (accept/reject)
// router.post('/update-connection-status', async (req: Request, res: Response) => {
//   const { fileId, status } = req.body; // Include fileId and status in the request body

//   if (!status || !['accepted', 'rejected'].includes(status)) {
//     return res.status(400).json({ message: 'Invalid status' });
//   }

//   try {
//     // Fetch the file details from the uploads table
//     const [file]: any[] = await pool.query(
//       'SELECT * FROM uploads WHERE id = ?',
//       { replacements: [fileId], type: QueryTypes.SELECT }
//     );

//     if (!file) return res.status(404).json({ message: 'File not found' });

//     // Ensure that the status is pending before accepting or rejecting
//     if (file.status !== 'pending') {
//       return res.status(400).json({ message: 'Connection request already processed' });
//     }

//     // Update the status of the file to either 'accepted' or 'rejected'
//     await pool.query(
//       'UPDATE uploads SET status = ? WHERE id = ?',
//       { replacements: [status, fileId], type: QueryTypes.UPDATE }
//     );

//     res.status(200).json({ message: `Connection ${status} successfully` });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });




// // user update route
// router.post("/update-user", async (req, res) => {
//   const {
//     id,
//     full_name,
//     email,
//     password,
//     confirm_password,
//     number,
//     role,
//     sector
//   } = req.body;

//   if (!id) return res.status(400).json({ error: "User ID is required" });
//   if (password !== confirm_password) return res.status(400).json({ error: "Passwords do not match" });

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     await pool.query(
//       `UPDATE users2 
//        SET full_name = :full_name,
//            email = :email,
//            password = :password,
//            confirm_password = :confirm_password,
//            number = :number,
//            role = :role,
//            sector = :sector,
//            updated_at = NOW()
//        WHERE id = :id`,
//       {
//         replacements: {
//           full_name,
//           email,
//           password: hashedPassword,
//           confirm_password: hashedPassword,
//           number,
//           role,
//           sector,
//           id
//         },
//         type: QueryTypes.UPDATE
//       }
//     );

//     res.json({ message: "User updated successfully" });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

const sendProfileUpdateEmail = async (email: string, fullName: string) => {
  try {
    await resend.emails.send({
      from: 'VentureLink <onboarding@resend.dev>', // Must use verified domain
      to: email,
      subject: 'Your VentureLink Profile Was Updated',
      html: `<p>Hi ${fullName},</p>
             <p>Your profile was successfully updated on <strong>VentureLink</strong>.</p>
             <p>If you did not make this change, please contact support immediately.</p>`,
    });
    console.log('✅ Profile update email sent to:', email);
  } catch (error) {
    console.error('❌ Error sending profile update email:', error);
  }
};

// user update route
router.post("/update-user", async (req, res) => {
  const {
    id,
    full_name,
    email,
    password,
    confirm_password,
    number,
    role,
    sector
  } = req.body;

  if (!id) return res.status(400).json({ error: "User ID is required" });
  if (password !== confirm_password) return res.status(400).json({ error: "Passwords do not match" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `UPDATE users2 
       SET full_name = :full_name,
           email = :email,
           password = :password,
           confirm_password = :confirm_password,
           number = :number,
           role = :role,
           sector = :sector,
           updated_at = NOW()
       WHERE id = :id
       RETURNING *`,
      {
        replacements: {
          full_name,
          email,
          password: hashedPassword,
          confirm_password: hashedPassword,
          number,
          role,
          sector,
          id
        },
        type: QueryTypes.UPDATE
      }
    );

    // ✅ Send email after successful update
    await sendProfileUpdateEmail(email, full_name);

    res.status(200).json({ message: 'Profile updated and email sent.', data: result });
  } catch (error) {
    console.error('❌ Profile update error:', error);
    res.status(500).json({ error: (error as Error).message });
  }
});


router.post('/send-notification', async (req, res) => {
  const {
    sender_id,
    receiver_id,
    upload_id,
    message,
    type,
    status,
    metadata, // optional
  } = req.body;

  try {
    const result = await sequelize.query(
      `INSERT INTO notifications 
        (sender_id, receiver_id, upload_id, message, type, status, metadata, created_at)
       VALUES 
        (:sender_id, :receiver_id, :upload_id, :message, :type, :status, :metadata, NOW())`,
      {
        replacements: {
          sender_id,
          receiver_id,
          upload_id,
          message,
          type,
          status,
          metadata: metadata ?? null, // 👈 fallback to null if undefined
        },
        type: QueryTypes.INSERT,
      }
    );

    res.status(201).json({ message: 'Notification inserted successfully' });
  } catch (err) {
    console.error('❌ Error inserting notification:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/get-notifications', async (req: Request, res: Response) => {
  const userId = parseInt(req.body.user_id, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid or missing user ID' });
  }

  try {
    const notifications = await sequelize.query(
      `SELECT id, sender_id, receiver_id, upload_id, message, type, status, metadata, created_at 
       FROM notifications 
       WHERE receiver_id = :userId 
       ORDER BY created_at DESC`,
      {
        replacements: { userId },
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/upload-profile-photo', upload.single('photo'), async (req, res) => {
  const userId = req.body.user_id;
  const file = req.file;

  console.log('Received upload for user:', userId);
  console.log('Uploaded file:', file);

  if (!userId || !file?.filename) {
    console.error('Missing user ID or file in request');
    return res.status(400).json({ message: 'Missing user ID or file' });
  }

  try {
    await sequelize.query(
      `INSERT INTO user_photos (user_id, photo_path)
       VALUES (:userId, :filePath)`,
      {
        replacements: {
          userId,
          filePath: file.filename
        },
        type: QueryTypes.INSERT
      }
    );

    return res.status(200).json({ message: 'Photo uploaded successfully', file: file.filename });
  } catch (error) {
    console.error('🔥 ERROR inserting photo:', error);
    return res.status(500).json({ message: 'Server error while uploading photo' });
  }
});
// ✅ GET route to fetch the latest profile photo of a user
router.get('/user-photo/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await sequelize.query(
      `SELECT photo_path FROM user_photos
       WHERE user_id = :userId
       ORDER BY uploaded_at DESC
       LIMIT 1`,
      {
        replacements: { userId },
        type: QueryTypes.SELECT,
      }
    ) as { photo_path: string }[]; // ✅ Type assertion to fix TS error

    if (result.length === 0) {
      return res.status(404).json({ message: 'No photo found' });
    }

    return res.status(200).json({ photo_path: result[0].photo_path });
  } catch (error) {
    console.error('Fetch photo error:', error);
    return res.status(500).json({ message: 'Error fetching photo' });
  }
});



router.put('/update-profile/:userId', async (req, res) => {
  const { userId } = req.params;
  const {
    full_name,
    number,
    role,
    sector,
    password,
    confirm_password
  } = req.body;

  if (password !== confirm_password) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    await sequelize.query(
      `UPDATE users2
       SET full_name = :full_name,
           number = :number,
           role = :role,
           sector = :sector,
           password = :password,
           confirm_password = :confirm_password,
           updated_at = NOW()
       WHERE id = :userId`,
      {
        replacements: {
          userId,
          full_name,
          number,
          role,
          sector,
          password,
          confirm_password,
        },
        type: QueryTypes.UPDATE,
      }
    );

    return res.status(200).json({ message: 'Profile and password updated successfully' });
  } catch (error) {
    console.error('Update error:', error);
    return res.status(500).json({ message: 'Server error updating profile' });
  }
});

    return router;
}

