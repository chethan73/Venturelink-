import express from 'express';
import { Pool } from 'pg'; // Assuming you're using PostgreSQL
const router = express.Router();

const pool = new Pool({
  user: 'postgres', // Replace with your DB user
  host: 'localhost',
  database: 'Venturelink_db', // Replace with your database name
  password: 'root', // Replace with your DB password
  port: 5432,
});

// Fetch leaderboard data (users with role 'startup')
router.get('/api/leaderboard', async (req, res) => {
  try {
    // Query to fetch the number of posts made and the number of responses for each startup
    const result = await pool.query(`
      SELECT
        u.id,
        u.full_name,
        u.email,
        u.sector,
        u.role,
        u.created_at,
        COALESCE(p.posts_count, 0) AS posts_made,
        COALESCE(ir.responses_count, 0) AS responses_received
      FROM users u
      LEFT JOIN (
        SELECT startup_id, COUNT(*) AS posts_count
        FROM posts
        GROUP BY startup_id
      ) p ON p.startup_id = u.id
      LEFT JOIN (
        SELECT startup_id, COUNT(*) AS responses_count
        FROM investor_responses
        GROUP BY startup_id
      ) ir ON ir.startup_id = u.id
      WHERE u.role = 'startup'
      ORDER BY posts_made DESC, responses_received DESC
      LIMIT 10;
    `);

    // Process each startup data and calculate the rank based on posts and responses
    const leaderboardData = result.rows.map((startup: any, index: number) => {
      // Calculate the rank score using a weighted formula (adjust weights as needed)
      const postWeight = 0.4;
      const responseWeight = 0.6;
      const rankScore = (startup.posts_made * postWeight) + (startup.responses_received * responseWeight);
      startup.rank = rankScore; // You can save this rank in your database if needed
      return startup;
    });

    // Send the leaderboard data as a response
    res.json(leaderboardData);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
