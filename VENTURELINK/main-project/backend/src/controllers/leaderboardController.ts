// // controllers/leaderboardController.ts
// import { Request, Response } from 'express';
// import { User } from '../models/User'; // Assume this is your User model, adjust according to your setup

// export const getLeaderboard = async (req: Request, res: Response) => {
//   try {
//     const leaderboard = await User.find()  // Adjust this query based on your DB and fields
//       .sort({ score: -1 })  // Sort by the 'score' field to get the leaderboard in descending order
//       .limit(10);  // Limit to top 10 players
    
//     res.status(200).json(leaderboard); // Return the leaderboard data as JSON
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching leaderboard data', error });
//   }
// };
