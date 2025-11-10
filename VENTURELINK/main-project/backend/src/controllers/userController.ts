import { Request, Response } from 'express';
import pool from '../database'; // Adjust path based on your actual DB file

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users2'); // Use your actual table name
    const users = rows as any[];
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
