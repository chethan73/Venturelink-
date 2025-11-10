// 'use client';
// import React, { useEffect, useState } from 'react';
// import { 
//   CheckCircle, 
//   XCircle, 
//   Loader, 
//   Calendar, 
//   Clock, 
//   AlertCircle,
//   MoreVertical,
//   BarChart,
//   Tag,
//   Star,
//   Bell,
//   Filter,
//   Search,
//   TrendingUp,
//   Menu,
//   Plus,
//   ChevronDown,
//   ChevronUp,
//   Check,
//   Flag,
//   Circle
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const Tasks = () => {
//   const [tasks, setTasks] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [hoveredTask, setHoveredTask] = useState<number | null>(null);
//   const [expandedTask, setExpandedTask] = useState<number | null>(null);
//   const [activeFilter, setActiveFilter] = useState<string>('all');
//   const [searchQuery, setSearchQuery] = useState<string>('');

//   const fetchTasks = async () => {
//     setLoading(true);
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 800));
//       const mockTasks = [
//         {
//           id: 1,
//           title: 'Complete project proposal',
//           description: 'Finish the client proposal document with all requirements',
//           status: 'in-progress',
//           priority: 'high',
//           date: '2023-11-15',
//           time: '10:00 AM',
//           category: 'Work'
//         },
//         {
//           id: 2,
//           title: 'Team meeting',
//           description: 'Weekly sync with development team',
//           status: 'completed',
//           priority: 'medium',
//           date: '2023-11-14',
//           time: '2:30 PM',
//           category: 'Meeting'
//         },
//         {
//           id: 3,
//           title: 'Review design mockups',
//           description: 'Provide feedback on new UI designs',
//           status: 'pending',
//           priority: 'high',
//           date: '2023-11-16',
//           time: '11:00 AM',
//           category: 'Design'
//         }
//       ];
//       setTasks(mockTasks);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMarkCompleted = (taskId: number) => {
//     setTasks(prevTasks =>
//       prevTasks.map(task =>
//         task.id === taskId ? { ...task, status: 'completed' } : task
//       )
//     );
//   };

//   const handleDeleteTask = (taskId: number) => {
//     setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
//   };

//   const filteredTasks = tasks.filter(task => {
//     const matchesFilter = activeFilter === 'all' || 
//                          (activeFilter === 'completed' && task.status === 'completed') || 
//                          (activeFilter === 'pending' && task.status !== 'completed');
    
//     const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
//     return matchesFilter && matchesSearch;
//   });

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const priorityColors = {
//     high: 'bg-red-500',
//     medium: 'bg-yellow-500',
//     low: 'bg-blue-500'
//   };

//   const statusColors = {
//     completed: 'bg-green-500',
//     'in-progress': 'bg-blue-500',
//     pending: 'bg-gray-500'
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
//         >
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
//                 <BarChart className="w-6 h-6" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
//                 <p className="text-gray-500 text-sm">Stay organized and productive</p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-4 w-full md:w-auto">
//               <div className="relative flex-1 md:w-64">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Search tasks..."
//                   className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
              
//               <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
//                 <Plus className="w-4 h-4" />
//                 <span>New Task</span>
//               </button>
//             </div>
//           </div>

//           {/* Filters */}
//           <div className="mt-6 flex flex-wrap gap-2">
//             {['all', 'completed', 'pending'].map((filter) => (
//               <button
//                 key={filter}
//                 onClick={() => setActiveFilter(filter)}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                   activeFilter === filter
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                 }`}
//               >
//                 {filter.charAt(0).toUpperCase() + filter.slice(1)}
//               </button>
//             ))}
            
//             <div className="relative ml-auto">
//               <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-gray-600 text-sm font-medium">
//                 <Filter className="w-4 h-4" />
//                 <span>Sort</span>
//                 <ChevronDown className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Stats */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
//         >
//           {[
//             { title: 'Total Tasks', value: tasks.length, icon: <BarChart className="w-5 h-5" />, color: 'bg-blue-500' },
//             { title: 'Completed', value: tasks.filter(t => t.status === 'completed').length, icon: <Check className="w-5 h-5" />, color: 'bg-green-500' },
//             { title: 'Pending', value: tasks.filter(t => t.status !== 'completed').length, icon: <Circle className="w-5 h-5" />, color: 'bg-yellow-500' }
//           ].map((stat, index) => (
//             <motion.div 
//               key={stat.title}
//               whileHover={{ y: -5 }}
//               className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all"
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-sm text-gray-500">{stat.title}</p>
//                   <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
//                 </div>
//                 <div className={`p-3 rounded-lg ${stat.color}/10 text-${stat.color.split('-')[1]}-500`}>
//                   {stat.icon}
//                 </div>
//               </div>
//               <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
//                 <motion.div 
//                   className={`h-full ${stat.color} rounded-full`}
//                   initial={{ width: 0 }}
//                   animate={{ width: `${(stat.value / Math.max(1, tasks.length)) * 100}%` }}
//                   transition={{ duration: 1, delay: index * 0.2 }}
//                 />
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Tasks List */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
//         >
//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                 className="text-blue-500"
//               >
//                 <Loader className="w-8 h-8" />
//               </motion.div>
//             </div>
//           ) : filteredTasks.length > 0 ? (
//             <div className="space-y-4">
//               {filteredTasks.map((task) => (
//                 <motion.div
//                   key={task.id}
//                   layout
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className={`group relative overflow-hidden rounded-xl border border-gray-200 hover:border-blue-200 transition-all ${
//                     expandedTask === task.id ? 'bg-blue-50/30' : 'bg-white'
//                   }`}
//                   onMouseEnter={() => setHoveredTask(task.id)}
//                   onMouseLeave={() => setHoveredTask(null)}
//                 >
//                   {/* Priority indicator */}
//                   <div className={`absolute top-0 left-0 h-full w-1 ${priorityColors[task.priority] || 'bg-gray-500'}`}></div>
                  
//                   <div className="p-5">
//                     <div className="flex justify-between items-start">
//                       <div className="flex items-start gap-3 flex-1">
//                         <button 
//                           onClick={() => handleMarkCompleted(task.id)}
//                           className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border ${
//                             task.status === 'completed'
//                               ? 'bg-green-500 border-green-500 text-white flex items-center justify-center'
//                               : 'border-gray-300 hover:border-blue-500'
//                           } transition-colors`}
//                         >
//                           {task.status === 'completed' && <Check className="w-3 h-3" />}
//                         </button>
                        
//                         <div 
//                           className="flex-1 cursor-pointer"
//                           onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
//                         >
//                           <div className="flex items-center gap-2">
//                             <h3 className={`font-medium ${
//                               task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-800'
//                             }`}>
//                               {task.title}
//                             </h3>
//                             {task.priority === 'high' && (
//                               <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800">
//                                 <Flag className="w-3 h-3" /> High
//                               </span>
//                             )}
//                           </div>
                          
//                           <AnimatePresence>
//                             {expandedTask === task.id && (
//                               <motion.p
//                                 initial={{ opacity: 0, height: 0 }}
//                                 animate={{ opacity: 1, height: 'auto' }}
//                                 exit={{ opacity: 0, height: 0 }}
//                                 className="mt-2 text-gray-600 text-sm"
//                               >
//                                 {task.description}
//                               </motion.p>
//                             )}
//                           </AnimatePresence>
                          
//                           <div className="mt-3 flex flex-wrap gap-2">
//                             <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-600">
//                               <Calendar className="w-3 h-3" /> {task.date}
//                             </span>
//                             <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-600">
//                               <Clock className="w-3 h-3" /> {task.time}
//                             </span>
//                             <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-blue-100 text-blue-600">
//                               <Tag className="w-3 h-3" /> {task.category}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-2">
//                         <AnimatePresence>
//                           {hoveredTask === task.id && (
//                             <motion.button
//                               initial={{ opacity: 0, x: 10 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               exit={{ opacity: 0, x: 10 }}
//                               onClick={() => handleDeleteTask(task.id)}
//                               className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                             >
//                               <XCircle className="w-5 h-5" />
//                             </motion.button>
//                           )}
//                         </AnimatePresence>
                        
//                         <button 
//                           onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
//                           className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
//                         >
//                           {expandedTask === task.id ? (
//                             <ChevronUp className="w-5 h-5" />
//                           ) : (
//                             <ChevronDown className="w-5 h-5" />
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="text-center py-16"
//             >
//               <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-400 mb-4">
//                 <AlertCircle className="w-8 h-8" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-800">No tasks found</h3>
//               <p className="text-gray-500 mt-1">
//                 {searchQuery ? 'Try a different search term' : 'Create a new task to get started'}
//               </p>
//               <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
//                 <Plus className="w-4 h-4" />
//                 Add Task
//               </button>
//             </motion.div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Tasks;

'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Notification {
  id: string;
  type: 'meeting' | 'message' | 'alert' | 'update';
  message: string;
  status: 'read' | 'unread' | 'urgent';
  created_at: string;
  link?: string;
  meetingCode?: string;
}

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Get user ID from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('users2');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser?.id?.toString() ?? null);
      } catch (err) {
        console.error('Failed to parse user data:', err);
      }
    }
  }, []);

  // Fetch notifications
  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const res = await axios.post('http://localhost:5000/api/get-notifications', {
          user_id: userId,
        });
        
        // Transform notifications - add meeting links if they don't exist
        const processedNotifications = res.data.map((notification: any) => {
          if (notification.type === 'meeting' && !notification.link) {
            return {
              ...notification,
              link: generateMeetLink(),
              meetingCode: generateMeetingCode()
            };
          }
          return notification;
        });
        
        setNotifications(processedNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, [userId]);

  // Generate a random Google Meet link (for demo purposes)
  const generateMeetLink = () => {
    const codes = generateMeetingCode().split('-').join('');
    return `https://meet.google.com/${codes}`;
  };

  // Generate random meeting code (abc-def-ghi format)
  const generateMeetingCode = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const parts = [3, 3, 3].map(len => {
      return Array.from({length: len}, () => 
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join('');
    });
    return parts.join('-');
  };

  // Join meeting handler
  const handleJoinMeeting = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? {...n, status: 'read'} : n
    ));
    // In a real app, you would also call your API here
  };

  // Delete notification
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    // In a real app, you would also call your API here
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <h1 className="text-2xl font-bold">Meeting Notifications</h1>
            </div>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
              {notifications.length} {notifications.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        {/* Notification List */}
        <div className="divide-y divide-gray-200">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No notifications</h3>
              <p className="mt-1 text-gray-500">All caught up! Check back later.</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 hover:bg-gray-50 transition-colors ${notification.status === 'unread' ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start">
                  {/* Notification Icon */}
                  <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  {/* Notification Content */}
                  <div className="ml-4 flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {formatNotificationTitle(notification.type)}
                      </p>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="text-gray-400 hover:text-gray-500"
                          title="Mark as read"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-500"
                          title="Delete"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {formatDateTime(notification.created_at)}
                    </p>
                    
                    {/* Meeting Link Section */}
                    {notification.type === 'meeting' && notification.link && (
                      <div className="mt-3 bg-blue-50 rounded-lg p-3 border border-blue-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium text-blue-800">Google Meet</p>
                            <p className="text-sm font-mono text-blue-600 mt-1">
                              {notification.meetingCode}
                            </p>
                          </div>
                          <button
                            onClick={() => handleJoinMeeting(notification.link!)}
                            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Join Now
                          </button>
                        </div>
                        <p className="mt-2 text-xs text-blue-700">
                          Meeting link: <a href={notification.link} target="_blank" rel="noopener noreferrer" className="underline">{notification.link}</a>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getNotificationColor = (type: string) => {
  switch (type) {
    case 'meeting': return 'bg-red-100 text-red-600';
    case 'message': return 'bg-blue-100 text-blue-600';
    case 'alert': return 'bg-yellow-100 text-yellow-600';
    case 'update': return 'bg-green-100 text-green-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const getNotificationIcon = (type: string) => {
  const iconClass = "h-5 w-5";
  switch (type) {
    case 'meeting':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    case 'message':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      );
    case 'alert':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
};

const formatNotificationTitle = (type: string) => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export default NotificationPage;
