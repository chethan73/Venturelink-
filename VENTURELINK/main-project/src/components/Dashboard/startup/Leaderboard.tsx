// // Leaderboard.tsx

// import { useEffect, useState } from 'react';
// import { Card, CardContent } from "@/components/ui/card";
// import { motion } from 'framer-motion';

// interface LeaderboardEntry {
//   id: number;
//   name: string;
//   score: number;
//   role: 'Investor' | 'Startup';
// }

// const Leaderboard = ({ role }: { role: 'Investor' | 'Startup' }) => {
//   const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

//   useEffect(() => {
//     // Mock data fetching
//     const fetchData = async () => {
//       const data: LeaderboardEntry[] = [
//         { id: 1, name: 'Alpha Ventures', score: 95, role: 'Investor' },
//         { id: 2, name: 'Beta Innovations', score: 88, role: 'Startup' },
//         { id: 3, name: 'Gamma Capital', score: 92, role: 'Investor' },
//         { id: 4, name: 'Delta Tech', score: 85, role: 'Startup' },
//       ];
//       setLeaderboardData(data.filter(entry => entry.role === role));
//     };

//     fetchData();
//   }, [role]);

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold text-center mb-6">{role} Leaderboard</h1>
//       <div className="grid gap-4">
//         {leaderboardData.map((entry, index) => (
//           <motion.div
//             key={entry.id}
//             className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex justify-between items-center"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <span className="text-xl font-medium">{index + 1}. {entry.name}</span>
//             <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">{entry.score} pts</span>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;


// Leaderboard.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';
import axios from 'axios';

interface LeaderboardEntry {
  id: number;
  name: string;
  score: number;
  role: 'Investor' | 'Startup';
}

const Leaderboard = ({ role }: { role: 'Investor' | 'Startup' }) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get<LeaderboardEntry[]>(`http://localhost:8000/leaderboard?role=${role}`);
        
        const sorted = response.data
          .filter(entry => entry.role === role)
          .sort((a, b) => b.score - a.score)
          .slice(0, 5);

        setLeaderboardData(sorted);
      } catch (error) {
        console.error("Failed to fetch leaderboard data:", error);
      }
    };

    fetchLeaderboard();
  }, [role]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">{role} Leaderboard</h1>
      <div className="grid gap-4">
        {leaderboardData.map((entry, index) => (
          <motion.div
            key={entry.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="text-xl font-medium">{index + 1}. {entry.name}</span>
            <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">{entry.score} pts</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
