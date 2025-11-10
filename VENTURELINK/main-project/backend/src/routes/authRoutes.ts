import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Investor from '../models/Investor';
import Startup from '../models/Startup';

// Register Investor
export const registerInvestor = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, confirmPassword, number, sector } = req.body;

    // Validate input fields
    if (!email || !password || !confirmPassword || !number || !sector || !fullname) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const existingInvestor = await Investor.findOne({ where: { email } });
    if (existingInvestor) {
      return res.status(400).json({ error: 'Investor already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newInvestor = await Investor.create({ fullname, email, password: hashedPassword, number, sector });

    res.status(201).json({
      message: 'Investor registered successfully',
      investor: {
        id: newInvestor.id,
        fullname: newInvestor.fullname,
        email: newInvestor.email,
        number: newInvestor.number,
        sector: newInvestor.sector,
      },
    });

  } catch (error) {
    console.error('Error during investor registration:', error);
    res.status(500).json({ error: 'Server error', details: process.env.NODE_ENV === 'production' ? 'Internal server error' : (error as Error).message });
  }
};

// Register Startup
// export const registerStartup = async (req: Request, res: Response) => {
//   try {
//     const { name, email, password, confirmPassword, contactNumber, sector } = req.body;

//     // Validate input fields
//     if (!email || !password || !confirmPassword || !contactNumber || !sector || !name) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ error: 'Passwords do not match' });
//     }

//     const existingStartup = await Startup.findOne({ where: { email } });
//     if (existingStartup) {
//       return res.status(400).json({ error: 'Startup already exists with this email' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
//     const newStartup = await Startup.create({ name, email, password: hashedPassword, contactNumber, sector });

//     res.status(201).json({
//       message: 'Startup registered successfully',
//       startup: {
//         id: newStartup.id,
//         name: newStartup.fullname, // Corrected from fullname to name
//         email: newStartup.email,
//         contactNumber: newStartup.number, // Corrected from number to contactNumber
//         sector: newStartup.sector,
//       },
//     });

//   } catch (error) {
//     console.error('Error during startup registration:', error);
//     res.status(500).json({ error: 'Server error', details: process.env.NODE_ENV === 'production' ? 'Internal server error' : (error as Error).message });
//   }
// };

// // Login Investor
// export const loginInvestor = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     // Validate input fields
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }

//     const investor = await Investor.findOne({ where: { email } });
//     if (!investor) {
//       return res.status(400).json({ error: 'Investor not found' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, investor.password); // Compare hashed password
//     if (!isPasswordValid) {
//       return res.status(400).json({ error: 'Invalid password' });
//     }

//     const token = jwt.sign({ id: investor.id, email: investor.email }, process.env.JWT_SECRET_KEY || 'your-secret-key', { expiresIn: '1h' }); // Generate JWT token
//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       investor: {
//         id: investor.id,
//         fullname: investor.fullname,
//         email: investor.email,
//         number: investor.number,
//         sector: investor.sector,
//       },
//     });

//   } catch (error) {
//     console.error('Error during investor login:', error);
//     res.status(500).json({ error: 'Server error', details: process.env.NODE_ENV === 'production' ? 'Internal server error' : (error as Error).message });
//   }
// };

// // Login Startup
// export const loginStartup = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     // Validate input fields
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }

//     const startup = await Startup.findOne({ where: { email } });
//     if (!startup) {
//       return res.status(400).json({ error: 'Startup not found' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, startup.password); // Compare hashed password
//     if (!isPasswordValid) {
//       return res.status(400).json({ error: 'Invalid password' });
//     }

//     const token = jwt.sign({ id: startup.id, email: startup.email }, process.env.JWT_SECRET_KEY || 'your-secret-key', { expiresIn: '1h' }); // Generate JWT token
//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       startup: {
//         id: startup.id,
//         name: startup.fullname, // Corrected from fullname to name
//         email: startup.email,
//         contactNumber: startup.number, // Corrected from number to contactNumber
//         sector: startup.sector,
//       },
//     });

//   } catch (error) {
//     console.error('Error during startup login:', error);
//     res.status(500).json({ error: 'Server error', details: process.env.NODE_ENV === 'production' ? 'Internal server error' : (error as Error).message });
//   }
// };

// Export the functions for use in routes
export default {
  registerInvestor,
  // registerStartup,
  // loginInvestor,
  // loginStartup,
};
