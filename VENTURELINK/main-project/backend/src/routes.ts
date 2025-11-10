
// import express, { Request, Response } from 'express';
// import pool from './database';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// const multer = require('multer');
// const path = require('path');
// const bodyParser = require('body-parser');
// // import { getInvestorsByRole } from './controllers/investorController'; // Adjust the import path


// const router = express.Router();

// // ✅ Register User
// router.post('/register', async (req: Request, res: Response) => {
//   const { full_name, email, password, number, role, sector } = req.body;

//   try {
//     const result = await pool.query(`
//       INSERT INTO users2 (full_name, email, password, number, role, sector) 
//       VALUES ('${full_name}', '${email}', '${password}', '${number}', '${role}', '${sector}') 
//       RETURNING *`
//     );

//     res.status(201).json({ message: 'User registered successfully', data: result[0] });
//   } catch (error) {
//     res.status(500).json({ error: (error as Error).message });
//   }
// });






// // ✅ Login User
// router.post('/login', async (req: Request, res: Response) => {
//   const { email, password, role } = req.body;

//   try {
//     const result = await pool.query(`SELECT * FROM users2;`);

//     const user = result[0].find((d: any) => d.email === email && d.password === password);
//     if (user) {
//       res.status(201).json({ message: 'Login success', data: user });
//     } else {
//       res.status(400).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: (error as Error).message });
//   }
// });

// // ✅ Get All Users
// router.get('/getall', async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(`SELECT * FROM users2;`);
//     res.status(200).json({ message: 'Users retrieved successfully', data: result[0] });
//   } catch (error) {
//     res.status(500).json({ error: (error as Error).message });
//   }
// });

// // ✅ Get User by ID (New Route)
// router.get('/register/:id', async (req: Request, res: Response) => {
//   const userId = req.params.id;

//   try {
//     const result = await pool.query(`SELECT * FROM users2 WHERE id = '${userId}'`);
//     const user = result[0][0];

//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: (error as Error).message });
//   }
// });

// // Uploads files
// const storage = multer.diskStorage({
//   destination: (req : any, file : any, cb : any) => {
//       cb(null, 'uploads/'); // Save files in the 'uploads' directory
//   },
//   filename: (req : any, file : any, cb : any) => {
//       // Rename the file to avoid conflicts
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//       cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   },
// });

// // Filter to allow only JPG images
// const fileFilter = (req : any, file : any, cb : any) => {
//   cb(null, true); 
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
// });

// // API endpoint to handle image upload
// router.post('/upload', upload.single('image'), (req : any, res) => {
//   try {
//       if (!req.file) {
//           return res.status(400).json({ error: 'No file uploaded or invalid file type' });
//       }
//        const {name , descrition , category} = req.body;
//        const path = req.file.filename ;
//       // Send a success response with file details
//       res.status(200).json({
//           message: 'Image uploaded successfully',
//           file: req.file,
//       });
//   } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'An error occurred while uploading the image' });
//   }
// });

// // Serve uploaded images statically
// router.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// //test end




// export default router;



import express, { Request, Response } from 'express';
import fs from "fs";

// Extend the Request interface to include the user property
interface CustomRequest extends Request {
  user?: {
    id: number;
  };
}
import { Sequelize, QueryTypes } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
import multer from 'multer';
import bcrypt from 'bcrypt';
import pool from './database'; // Import the pool object
import users from './users';

interface User {
  id: number;
  full_name: string;
  email: string;
  sector: string;
  password: string;
  // Add other fields if necessary based on your 'users2' table
}
dotenv.config(); // Load environment variables from the .env file

const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_PORT } = process.env;
const DATABASE_URL = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: false,  // Optional: turn off SQL logging for cleaner output
});

const router = express.Router();

// ✅ Register User
router.post('/register', async (req: Request, res: Response) => {
  const { full_name, email, password, number, role, sector } = req.body;

  try {
    const result = await pool.query(`
      INSERT INTO users2 (full_name, email, password, number, role, sector) 
      VALUES ('${full_name}', '${email}', '${password}', '${number}', '${role}', '${sector}') 
      RETURNING *`
    );

    res.status(201).json({ message: 'User registered successfully', data: result[0] });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.post('/message', async (req: Request, res: Response) => {
  const { message , to } = req.body;

  try {
    const socketId = users[to]; // Find the user's socket ID
    if (socketId) {
        io.to(socketId).emit("new-message", { message });
    }

    res.status(201).json({ message: 'User registered successfully', data: "test" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
// ✅ Login User
router.post('/login', async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  try {
    const result = await pool.query(`SELECT * FROM users2;`);

    const user = result[0].find((d: any) => d.email === email && d.password === password);
    if (user) {
      res.status(201).json({ message: 'Login success', data: user });
    } else {
      res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// ✅ Get All Users
router.get('/getall', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users2;`);
    res.status(200).json({ message: 'Users retrieved successfully', data: result[0] });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
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

// POST route for file upload
router.post('/upload', upload.single('image'), async (req: any, res: Response) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded or invalid file type' });
    }

    // Get the file path and additional data from the request
    const { name, description, category } = req.body;
    const filePath = req.file.filename;  // Path of the uploaded file

    // Insert file details into the 'uploads' table
    const query = `
      INSERT INTO uploads (name, description, category, file_path)
      VALUES (:name, :description, :category, :file_path)
      RETURNING *;
    `;
    const values = { name, description, category, file_path: filePath };

    const result = await sequelize.query(query, {
      replacements: values,
      type: QueryTypes.RAW,
    });

    const data = result[0]; // Access the inserted file data
    res.status(200).json({
      message: 'File uploaded successfully',
      file: data,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
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
    const result = await pool.query(`SELECT * FROM uploads;`);
    if (result[0].length > 0) {
      res.status(200).json({ message: 'Files retrieved successfully', data: result[0] });
    } else {
      res.status(404).json({ message: 'No files found' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// ✅ Get File by ID (Fetch a specific file using its ID)
// router.get('/uploads/:Id', async (req: Request, res: Response) => {
//   const fileId = req.params.Id;  // Use 'Id' from the URL

//   try {
//     // Fetch all details of the file with the given fileId
//     const result = await pool.query(`SELECT * FROM uploads WHERE id = '${fileId}'`);
//     const fileData = result[0][0];  // Get the first record

//     if (fileData) {
//       res.status(200).json(fileData);  // Return all details of the file
//     } else {
//       res.status(404).json({ message: 'File not found' });
//   } catch (error) {
//     res.status(500).json({ error: (error as Error).message });
//   }
// });

// Serve uploaded files statically
// router.put('/update-settings', async (req: CustomRequest, res: Response) => {
//   try {
//         const { full_name, email, sector, password } = req.body;
//       if (!full_name || !email || !sector) {
//           return res.status(400).json({ message: 'Missing required fields' });
//       }

//       const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

//       // Update user in the database
//       const query = `
//           UPDATE users 
//           SET full_name = ?, email = ?, sector = ?, password = ?
//           WHERE id = ?`;
      
//       if (!req.user) {
//         return res.status(400).json({ message: 'User not authenticated' });
//       }
//       const values = [full_name, email, sector, hashedPassword, req.user.id]; // Ensure `req.user.id` is set

//       await sequelize.query(query, { replacements: values, type: QueryTypes.UPDATE });
      
//       return res.json({ message: 'Profile updated successfully' });
//   } catch (error) {
//         console.error('Error updating profile:', error);
//         return res.status(500).json({ message: 'Internal server error', error });
//   }
// });
router.put('/update-settings', async (req: CustomRequest, res: Response) => {
  const { full_name, email, password, number, sector } = req.body;

  try {
    // Ensure `role` is included and handled properly (replace with actual role or default)
    const role = 'user';  // You can set a default role or get it from the request body

    // Corrected query to update user settings, not insert
    const query = `
      UPDATE users2 
      SET full_name = '${full_name}', email = '${email}', password = '${password}', number = '${number}', sector = '${sector}', role = '${role}'
      WHERE id = ${req.user?.id}
      RETURNING *;
    `;

    // Ensure user is authenticated (check if `req.user` is available)
    if (!req.user) {
      return res.status(400).json({ message: 'User not authenticated' });
    }

    const result = await pool.query(query);
    res.status(200).json({
      message: 'User profile updated successfully',
      data: result[0],
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router
;









