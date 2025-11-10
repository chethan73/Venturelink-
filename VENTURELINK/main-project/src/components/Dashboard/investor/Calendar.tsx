// 'use client';

// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { motion } from 'framer-motion';
// import { Dialog } from '@headlessui/react';
// import { Button } from '../../button'; // Ensure this path is correct
// import axios from 'axios';

// const InvestorCalendar = () => {
//   const [date, setDate] = useState(new Date());
//   const [tasks, setTasks] = useState<{ date: string; title: string; time: string; description: string }[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newTask, setNewTask] = useState({ title: '', time: '', description: '' });
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null); // New state for success message

//   const handleDateClick = (selectedDate: Date) => {
//     setDate(selectedDate);
//     setIsModalOpen(true);
//   };

//   const handleAddTask = async () => {
//     if (!newTask.title || !newTask.time || !newTask.description) {
//       console.error('Missing fields:', newTask);
//       return;
//     }

//     setLoading(true);

//     const taskData = {
//       title: newTask.title,
//       discription: newTask.description, // Use 'discription' here
//       time: newTask.time,
//       date: date.toISOString().split('T')[0],
//     };

//     console.log('Sending taskData:', taskData); // Debugging log

//     try {
//       const response = await axios.post('http://localhost:5000/api/tasks', taskData, {
//         headers: { 'Content-Type': 'application/json' }, // Ensure JSON is sent properly
//       });

//       if (response.status === 201) {
//         setTasks([...tasks, response.data.data]);
//         setNewTask({ title: '', time: '', description: '' });
//         setIsModalOpen(false);

//         // Set success message with task details
//         setSuccessMessage(
//           `Task "${response.data.data.title}" has been added successfully for ${response.data.data.time} on ${response.data.data.date}.`
//         );
//       }
//     } catch (error) {
//       console.error('Error adding task:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Investor Calendar</h1>

//       <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4">
//         <Calendar
//           onChange={setDate}
//           value={date}
//           className="rounded-xl"
//           onClickDay={handleDateClick}
//         />

//         <div className="text-center mt-4 text-gray-700 dark:text-gray-300">
//           <strong>Selected Date:</strong> {date.toDateString()}
//         </div>

//         <div className="mt-4 space-y-2">
//           {tasks
//             .filter((task) => task.date === date.toISOString().split('T')[0])
//             .map((task, index) => (
//               <div key={index} className="bg-indigo-100 dark:bg-indigo-700 p-3 rounded-xl shadow">
//                 <h3 className="font-semibold text-lg">{task.title}</h3>
//                 <p>{task.description}</p>
//                 <span className="text-sm text-gray-600 dark:text-gray-300">{task.time}</span>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* Modal to add task */}
//       <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
//         <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />

//         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl max-w-md w-full z-50">
//           <h2 className="text-xl font-bold text-indigo-600 mb-4">Add Task/Meeting</h2>

//           <input
//             type="text"
//             placeholder="Title"
//             value={newTask.title}
//             onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//             className="w-full p-2 mb-2 border rounded-lg dark:bg-gray-700 dark:text-white"
//           />

//           <input
//             type="time"
//             value={newTask.time}
//             onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
//             className="w-full p-2 mb-2 border rounded-lg dark:bg-gray-700 dark:text-white"
//           />

//           <textarea
//             placeholder="Description"
//             value={newTask.description}
//             onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//             className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
//           />

//           <div className="flex justify-end space-x-2">
//             <Button onClick={() => setIsModalOpen(false)} variant="outline">
//               Cancel
//             </Button>
//             <Button
//               onClick={handleAddTask}
//               className="bg-indigo-600 text-white"
//               disabled={!newTask.title || !newTask.time || !newTask.description || loading}
//             >
//               {loading ? 'Adding...' : 'Add Task'}
//             </Button>
//           </div>
//         </div>
//       </Dialog>

//       {/* Success Message Dialog */}
//       <Dialog open={!!successMessage} onClose={() => setSuccessMessage(null)} className="fixed inset-0 z-50 flex items-center justify-center">
//         <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />

//         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl max-w-md w-full z-50">
//           <h2 className="text-xl font-bold text-green-600 mb-4">Task Added Successfully!</h2>
//           <p>{successMessage}</p>

//           <div className="flex justify-end space-x-2 mt-4">
//             <Button onClick={() => setSuccessMessage(null)} variant="outline">
//               Close
//             </Button>
//           </div>
//         </div>
//       </Dialog>
//     </motion.div>
//   );
// };

// export default InvestorCalendar;


'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { Button } from '../../button';
import axios from 'axios';
import { CheckCircle, Clock, Plus, X } from 'lucide-react';

const StartupCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState<{ date: string; title: string; time: string; description: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', time: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleDateClick = (selectedDate: Date) => {
    setDate(selectedDate);
    setIsModalOpen(true);
  };

  const handleAddTask = async () => {
    if (!newTask.title || !newTask.time || !newTask.description) {
      console.error('Missing fields:', newTask);
      return;
    }

    setLoading(true);

    const taskData = {
      title: newTask.title,
      discription: newTask.description,
      time: newTask.time,
      date: date.toISOString().split('T')[0],
    };

    try {
      const response = await axios.post('http://localhost:5000/api/tasks', taskData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        setTasks([...tasks, response.data.data]);
        setNewTask({ title: '', time: '', description: '' });
        setIsModalOpen(false);
        setSuccessMessage(
          `Task "${response.data.data.title}" has been added successfully for ${response.data.data.time} on ${response.data.data.date}.`
        );
      }
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Startup Calendar</h1>
          <p className="text-gray-600 dark:text-gray-400">Schedule and manage your Startup meetings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <Calendar
              onChange={setDate}
              value={date}
              className="border-0 w-full"
              onClickDay={handleDateClick}
              tileClassName={({ date: tileDate, view }) =>
                view === 'month' && tileDate.toDateString() === date.toDateString()
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200'
                  : null
              }
            />
          </div>

          {/* Tasks Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Tasks for {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                aria-label="Add task"
              >
                <Plus size={20} />
              </button>
            </div>

            {tasks.filter((task) => task.date === date.toISOString().split('T')[0]).length > 0 ? (
              <div className="space-y-3">
                {tasks
                  .filter((task) => task.date === date.toISOString().split('T')[0])
                  .map((task, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-indigo-500"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white">{task.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{task.description}</p>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="mr-1" size={14} />
                          {task.time}
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 dark:text-gray-500 mb-2">No tasks scheduled</div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-500 font-medium"
                >
                  Add your first task
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-xl font-bold text-gray-800 dark:text-white">
                  Schedule New Meeting
                </Dialog.Title>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Meeting Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Investor Pitch Meeting"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newTask.time}
                    onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    placeholder="Meeting agenda or notes"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    rows={4}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <Button
                    onClick={() => setIsModalOpen(false)}
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddTask}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    disabled={!newTask.title || !newTask.time || !newTask.description || loading}
                  >
                    {loading ? 'Scheduling...' : (
                      <>
                        <Plus className="mr-2" size={18} />
                        Schedule Meeting
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Dialog>

      {/* Success Notification */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border-l-4 border-green-500 max-w-sm">
            <div className="flex items-start">
              <CheckCircle className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Meeting Scheduled</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{successMessage}</p>
              </div>
              <button
                onClick={() => setSuccessMessage(null)}
                className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StartupCalendar;