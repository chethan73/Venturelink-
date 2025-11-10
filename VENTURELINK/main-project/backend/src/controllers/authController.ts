import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Investor from '../models/Investor';
import Startup from '../models/Startup';

// Register Investor
export const registerInvestor = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, confirmPassword, number, sector } = req.body;

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

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newInvestor = await Investor.create({ fullname, email, password: hashedPassword, confirmPassword: hashedPassword, number, sector });
    res.status(201).json({ message: 'Investor registered successfully', investor: newInvestor });

  } catch (error) {
    console.error('Error during investor registration:', error);
    res.status(500).json({ error: 'Server error', details: (error as any).message });
  }
};

// Register Startup
export const registerStartup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword, contactNumber, sector } = req.body;

    if (!email || !password || !confirmPassword || !contactNumber || !sector || !name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const existingStartup = await Startup.findOne({ where: { email } });
    if (existingStartup) {
      return res.status(400).json({ error: 'Startup already exists with this email' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStartup = await Startup.create({ name, email, password: hashedPassword, confirmPassword: hashedPassword, contactNumber, sector });
    res.status(201).json({ message: 'Startup registered successfully', startup: newStartup });

  } catch (error) {
    console.error('Error during startup registration:', error);
    res.status(500).json({ error: 'Server error', details: (error as any).message });
  }
};

// Login Investor
export const loginInvestor = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const investor = await Investor.findOne({ where: { email } });
    if (!investor) {
      return res.status(400).json({ error: 'Investor not found' });
    }

    // Compare provided password with the hashed password
    const isMatch = await bcrypt.compare(password, investor.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: investor.id, email: investor.email }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    console.error('Error during investor login:', error);
    res.status(500).json({ error: 'Server error', details: (error as any).message });
  }
};

// Login Startup
export const loginStartup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const startup = await Startup.findOne({ where: { email } });
    if (!startup) {
      return res.status(400).json({ error: 'Startup not found' });
    }

    // Compare provided password with the hashed password
    const isMatch = await bcrypt.compare(password, startup.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: startup.id, email: startup.email }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    console.error('Error during startup login:', error);
    res.status(500).json({ error: 'Server error', details: (error as any).message });
  }
};
