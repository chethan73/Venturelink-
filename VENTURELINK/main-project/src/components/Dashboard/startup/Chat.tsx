// "use client";

// import React, { useEffect, useState, useReducer, useRef } from "react";
// import axios from "axios";
// import { FaUser } from "react-icons/fa";
// import { io, Socket } from "socket.io-client";

// type User = {
//   id: number;
//   full_name: string;
//   email: string;
//   number: string;
//   sector: string;
//   role: string; // Can be 'Investor' or 'Startup'
// };

// type Message = {
//   text: string;
//   fromMe: boolean;
//   timestamp: string;
// };

// type MessageAction =
//   | { type: "ADD_MESSAGE"; payload: Message }
//   | { type: "SET_MESSAGES"; payload: Message[] };

// const initialState: Message[] = [];

// function messageReducer(state: Message[], action: MessageAction) {
//   switch (action.type) {
//     case "ADD_MESSAGE":
//       return [...state, action.payload];
//     case "SET_MESSAGES":
//       return action.payload;
//     default:
//       return state;
//   }
// }

// const Messages = () => {
//   const [investors, setInvestors] = useState<User[]>([]);
//   const [startups, setStartups] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [message, setMessage] = useState<string>("");
//   const [messages, dispatch] = useReducer(messageReducer, initialState);
//   const [loading, setLoading] = useState<boolean>(false);
//   const socketRef = useRef<Socket | null>(null);
//   const chatEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     socketRef.current = io("http://localhost:5000");

//     socketRef.current.on("receiveMessage", (data: { message: string; sender_id: number; timestamp: string }) => {
//       dispatch({ type: "ADD_MESSAGE", payload: { text: data.message, fromMe: data.sender_id === 1, timestamp: data.timestamp } });
//     });

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.off("receiveMessage");
//         socketRef.current.disconnect();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://localhost:5000/api/getall");
//         const users: User[] = response.data.data;

//         // Filter users based on role
//         setInvestors(users.filter((user) => user.role === "Investor"));
//         setStartups(users.filter((user) => user.role === "Startup"));
//       } catch (error) {
//         console.error("Failed to fetch users", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     if (!selectedUser) return;

//     const fetchMessages = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`http://localhost:5000/api/chat/1/${selectedUser.id}`);
//         dispatch({
//           type: "SET_MESSAGES",
//           payload: response.data.messages.map((msg: any) => ({
//             text: msg.message,
//             fromMe: msg.sender_id === 1,
//             timestamp: msg.timestamp,
//           })),
//         });
//       } catch (error) {
//         console.error("Failed to fetch messages", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMessages();
//   }, [selectedUser]);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = async () => {
//     if (selectedUser && message.trim()) {
//       try {
//         const timestamp = new Date().toISOString();
//         await axios.post("http://localhost:5000/api/send", {
//           sender_id: 1,
//           receiver_id: selectedUser.id,
//           message,
//           timestamp,
//         });
//         socketRef.current?.emit("sendMessage", { message, to: selectedUser.id, from: 1, timestamp });
//         dispatch({ type: "ADD_MESSAGE", payload: { text: message, fromMe: true, timestamp } });
//         setMessage("");
//       } catch (error) {
//         console.error("Failed to send message", error);
//       }
//     }
//   };

//   return (
//     <div className="flex p-4 space-x-4">
//       {/* Users List Section */}
//       <div className="w-full md:w-1/3">
//         <h1 className="text-2xl font-bold mb-4">Users List</h1>
//         {loading && <p>Loading...</p>}
        
//         <h2 className="font-semibold text-lg mt-4">Investors</h2>
//         <ul className="space-y-4">
//           {investors.map((user) => (
//             <li key={user.id} className="p-4 bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:bg-blue-50" onClick={() => setSelectedUser(user)}>
//               <div className="flex items-center space-x-4">
//                 <FaUser className="text-blue-500 text-xl" />
//                 <div>
//                   <p className="font-semibold">{user.full_name}</p>
//                   <p className="text-sm text-gray-500">{user.sector}</p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>

//         <h2 className="font-semibold text-lg mt-4">Startups</h2>
//         <ul className="space-y-4">
//           {startups.map((user) => (
//             <li key={user.id} className="p-4 bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:bg-blue-50" onClick={() => setSelectedUser(user)}>
//               <div className="flex items-center space-x-4">
//                 <FaUser className="text-green-500 text-xl" />
//                 <div>
//                   <p className="font-semibold">{user.full_name}</p>
//                   <p className="text-sm text-gray-500">{user.sector}</p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Chat Section */}
//       <div className="w-full md:w-2/3 p-4 bg-gray-50 rounded-lg shadow-md">
//         {selectedUser ? (
//           <>
//             <h2 className="text-xl font-semibold">Chat with {selectedUser.full_name}</h2>
//             <div className="h-96 overflow-y-auto bg-white p-4 rounded-md">
//               {messages.map((msg, idx) => (
//                 <div key={idx} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}>
//                   <div className={`p-4 max-w-xs rounded-xl ${msg.fromMe ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
//                     <p>{msg.text}</p>
//                     <span className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleTimeString()}</span>
//                   </div>
//                 </div>
//               ))}
//               <div ref={chatEndRef} />
//             </div>
//             <div className="flex items-center space-x-2 mt-2">
//               <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-2 border rounded-md" placeholder="Type your message..." />
//               <button onClick={sendMessage} className="p-2 bg-blue-500 text-white rounded-md">Send</button>
//             </div>
//           </>
//         ) : (
//           <p>Select a user to start chatting</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Messages;







  // 'use client';
  // import React, { useEffect, useState } from 'react';
  // import axios from 'axios';

  // interface User {
  //   id: number;
  //   name: string;
  // }

  // interface Message {
  //   id: number;
  //   sender_id: number;
  //   receiver_id: number;
  //   message: string;
  //   timestamp: string;
  // }

  // const Chat = () => {
  //   const [users, setUsers] = useState<User[]>([]);
  //   const [selectedUser, setSelectedUser] = useState<User | null>(null);
  //   const [messages, setMessages] = useState<Message[]>([]);
  //   const [newMessage, setNewMessage] = useState('');

  //   // Retrieve the user ID from localStorage
  //   const userId = localStorage.getItem('user_id'); // Assuming 'user_id' is stored in localStorage after login

  //   // Fetch all users
  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       try {
  //         const response = await axios.get('http://localhost:5000/api/getall');
  //         console.log('Fetched Users:', response.data);
  //         if (response.data.data) {
  //           setUsers(response.data.data);
  //         } else {
  //           console.error('No users data found in the response');
  //         }
  //       } catch (error) {
  //         console.error('Failed to fetch users:', error);
  //       }
  //     };

  //     fetchUsers();
  //   }, []);

  //   // Fetch messages when selectedUser changes
  //   useEffect(() => {
  //     const fetchMessages = async () => {
  //       if (!selectedUser || !userId) return; // Ensure userId is available

  //       try {
  //         const res = await axios.get('http://localhost:5000/api/messages', {
  //           params: {
  //             user1: userId,  // Use the userId from localStorage
  //             user2: selectedUser.id,
  //           },
  //         });
  //         setMessages(res.data);
  //       } catch (error) {
  //         console.error('Error fetching messages:', error);
  //       }
  //     };

  //     fetchMessages();
  //   }, [selectedUser, userId]);

  //   const sendMessage = async () => {
  //     if (!newMessage || !selectedUser || !userId) return; // Ensure userId is available
  //     try {
  //         const response = await axios.post('http://localhost:5000/api/messages', {
  //             sender_id: userId,
  //             receiver_id: selectedUser.id,
  //             message: newMessage,
  //         });
  //         console.log('Message sent:', response.data);
  //         setNewMessage('');

  //         // Refresh messages after sending
  //         const res = await axios.get('http://localhost:5000/api/messages', {
  //             params: {
  //                 user1: userId,
  //                 user2: selectedUser.id,
  //             },
  //         });
  //         setMessages(res.data);
  //     } catch (error) {
  //         console.error('Error sending message:', error);
  //         alert('Failed to send message. Please try again later.');
  //     }
  // };


  //   return (
  //     <div className="flex h-screen">
  //       {/* Left: User List */}
  //       <div className="w-1/2 border-r overflow-y-auto p-4">
  //         <h2 className="text-xl font-bold mb-4">Users</h2>
  //         {users.map((user) => (
  //           <div
  //             key={user.id}
  //             className={`p-2 cursor-pointer rounded hover:bg-gray-200 ${selectedUser?.id === user.id ? 'bg-blue-100' : ''}`}
  //             onClick={() => {
  //               console.log('Current User ID:', userId); // Log current user ID
  //               console.log('Selected User ID:', user.id); // Log selected user ID
  //               console.log('Selected User Name:', user.name); // Log selected user name
  //               setSelectedUser(user); // Set selected user
  //             }}
  //           >
  //             {user.name}
  //           </div>
  //         ))}
  //       </div>

  //       {/* Right: Chat Window */}
  //       <div className="w-1/2 flex flex-col p-4">
  //         {selectedUser ? (
  //           <>
  //             <div className="text-xl font-semibold mb-2">{selectedUser.name}</div>
  //             <div className="flex-1 overflow-y-auto border p-2 mb-4">
  //               {Array.isArray(messages) && messages.length > 0 ? (
  //                 messages.map((msg) => (
  //                   <div
  //                     key={msg.id}
  //                     className={`mb-2 p-2 rounded ${msg.sender_id === Number(userId) ? 'bg-blue-200 self-end' : 'bg-gray-100 self-start'}`}
  //                   >
  //                     {msg.message}
  //                   </div>
  //                 ))
  //               ) : (
  //                 <div className="text-gray-500">No messages yet.</div>
  //               )}
  //             </div>
  //             <div className="flex gap-2">
  //               <input
  //                 className="flex-1 border p-2 rounded"
  //                 value={newMessage}
  //                 onChange={(e) => setNewMessage(e.target.value)}
  //                 placeholder="Type a message..."
  //               />
  //               <button
  //                 className="bg-blue-500 text-white px-4 rounded"
  //                 onClick={sendMessage}
  //               >
  //                 Send
  //               </button>
  //             </div>
  //           </>
  //         ) : (
  //           <div className="text-gray-500 text-lg mt-10 text-center">Welcome to the chatting system</div>
  //         )}
  //       </div>
  //     </div>
  //   );
  // };

  // export default Chat;



// 'use client';
// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { io, Socket } from 'socket.io-client';
// import { FaUserCircle, FaPaperPlane } from 'react-icons/fa'; // Importing icons

// interface User {
//   id: number;
//   full_name: string;
//   role: string;
// }

// interface Message {
//   id: number;
//   sender_id: number;
//   receiver_id: number;
//   message: string;
//   timestamp: string;
// }

// const Chat = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const socketRef = useRef<Socket | null>(null);
//   const userId = localStorage.getItem('user_id');

//   // Initialize socket
//   useEffect(() => {
//     if (!userId) return;
//     socketRef.current = io('http://localhost:5000'); // Adjust if needed

//     socketRef.current.emit('join', userId);

//     socketRef.current.on('receive_message', (msg: Message) => {
//       if (msg.sender_id === selectedUser?.id || msg.receiver_id === selectedUser?.id) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     });

//     return () => {
//       socketRef.current?.disconnect();
//     };
//   }, [userId, selectedUser]);

//   // Fetch all users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/getall');
//         if (response.data.data) {
//           setUsers(response.data.data);
//           console.log("✅ All users from users2 table:", response.data.data);
//         } else {
//           console.error('No users data found in the response');
//         }
//       } catch (error) {
//         console.error('Failed to fetch users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Fetch messages when user is selected
//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (!selectedUser || !userId) return;

//       try {
//         const res = await axios.get('http://localhost:5000/api/messages', {
//           params: {
//             user1: userId,
//             user2: selectedUser.id,
//           },
//         });
//         setMessages(res.data);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     fetchMessages();
//   }, [selectedUser, userId]);

//   const sendMessage = async () => {
//     if (!newMessage || !selectedUser || !userId) return;

//     try {
//       await axios.post('http://localhost:5000/api/messages', {
//         sender_id: userId,
//         receiver_id: selectedUser.id,
//         message: newMessage,
//       });

//       setNewMessage('');

//       const res = await axios.get('http://localhost:5000/api/messages', {
//         params: {
//           user1: userId,
//           user2: selectedUser.id,
//         },
//       });
//       setMessages(res.data);
//     } catch (error) {
//       console.error('Error sending message:', error);
//       alert('Failed to send message. Please try again later.');
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 p-4">
//       {/* Left: User List */}
//       <div className="w-1/3 bg-white rounded-lg shadow-lg p-4 space-y-4 overflow-y-auto">
//         <h2 className="text-2xl font-semibold text-gray-800">Investors</h2>
//         {users
//           .filter((user) => user.role === 'Investor')
//           .map((user) => (
//             <div
//               key={user.id}
//               className={`p-3 cursor-pointer rounded-lg flex items-center space-x-3 hover:bg-gray-200 transition-all duration-300 ${
//                 selectedUser?.id === user.id ? 'bg-blue-100' : ''
//               }`}
//               onClick={() => setSelectedUser(user)}
//             >
//               <FaUserCircle className="text-3xl text-gray-600" />
//               <div className="flex-1">
//                 <div className="font-semibold text-gray-800">{user.full_name}</div>
//                 <div className="text-sm text-gray-500">{user.role}</div>
//               </div>
//             </div>
//           ))}
//       </div>

//       {/* Right: Chat Window */}
//       <div className="w-2/3 flex flex-col bg-white rounded-lg shadow-lg p-6">
//         {selectedUser ? (
//           <>
//             <div className="text-2xl font-semibold text-gray-800 mb-4">{selectedUser.full_name}</div>
//             <div className="flex-1 overflow-y-auto bg-gray-50 p-4 rounded-lg mb-4 space-y-4">
//               {messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`p-3 rounded-lg max-w-xs ${msg.sender_id === Number(userId) ? 'bg-blue-200 self-end' : 'bg-gray-200 self-start'}`}
//                   style={{ alignSelf: msg.sender_id === Number(userId) ? 'flex-end' : 'flex-start' }}
//                 >
//                   <p>{msg.message}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Message Input */}
//             <div className="flex items-center space-x-3">
//               <input
//                 className="flex-1 border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Type a message..."
//               />
//               <button
//                 className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all duration-300"
//                 onClick={sendMessage}
//               >
//                 <FaPaperPlane />
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="text-gray-500 text-lg mt-10 text-center">
//             Select a user to start chatting
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chat;

'use client';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import { FaUserCircle, FaPaperPlane, FaVideo, FaPhoneAlt, FaEllipsisV, FaCheck, FaCheckDouble } from 'react-icons/fa';
import Peer from 'simple-peer';
import { format } from 'date-fns';

interface User {
  id: number;
  full_name: string;
  role: string;
}

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

const Chat = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [callAccepted, setCallAccepted] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [caller, setCaller] = useState<string | null>(null);
  const [callerSignal, setCallerSignal] = useState<any>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [typingStatus, setTypingStatus] = useState('');

  const socketRef = useRef<Socket | null>(null);
  const userId = localStorage.getItem('user_id');
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize socket
  useEffect(() => {
    if (!userId) return;

    socketRef.current = io('http://localhost:5000');
    socketRef.current.emit('join', userId);

    socketRef.current.on('receive_message', (msg: Message) => {
      if (msg.sender_id === selectedUser?.id || msg.receiver_id === selectedUser?.id) {
        setMessages((prev) => [...prev, { ...msg, status: 'delivered' }]);
      }
    });

    socketRef.current.on('receive_call', ({ from, signal }) => {
      setCaller(from);
      setCallerSignal(signal);
    });

    socketRef.current.on('typing', ({ from, isTyping }) => {
      if (from === selectedUser?.id) {
        setTypingStatus(isTyping ? `${selectedUser.full_name} is typing...` : '');
      }
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [userId, selectedUser]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getall');
        if (response.data.data) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch messages when user is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser || !userId) return;

      try {
        const res = await axios.get('http://localhost:5000/api/messages', {
          params: {
            user1: userId,
            user2: selectedUser.id,
          },
        });
        setMessages(res.data.map((msg: Message) => ({ 
          ...msg, 
          status: msg.sender_id === Number(userId) ? 'read' : undefined 
        })));
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [selectedUser, userId]);

  const sendMessage = async () => {
    if (!newMessage || !selectedUser || !userId) return;

    try {
      const newMsg: Message = {
        id: Date.now(), // Temporary ID until server assigns one
        sender_id: Number(userId),
        receiver_id: selectedUser.id,
        message: newMessage,
        timestamp: new Date().toISOString(),
        status: 'sent'
      };

      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');

      await axios.post('http://localhost:5000/api/messages', {
        sender_id: userId,
        receiver_id: selectedUser.id,
        message: newMessage,
      });

      socketRef.current?.emit('send_message', {
        sender_id: userId,
        receiver_id: selectedUser.id,
        message: newMessage,
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    
    if (!selectedUser) return;
    
    socketRef.current?.emit('typing', {
      from: userId,
      to: selectedUser.id,
      isTyping: true
    });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current?.emit('typing', {
        from: userId,
        to: selectedUser.id,
        isTyping: false
      });
    }, 1000);
  };

  const startVideoCall = async () => {
    if (!selectedUser) return;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(stream);
      if (myVideo.current) {
        myVideo.current.srcObject = stream;
      }
      setIsVideoCall(true);

      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream,
      });

      peer.on('signal', (data) => {
        socketRef.current?.emit('callUser', {
          userToCall: selectedUser.id,
          signalData: data,
          from: userId,
        });
      });

      peer.on('stream', (stream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });

      socketRef.current?.on('callAccepted', (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      });

      connectionRef.current = peer;
    } catch (err) {
      console.error('Failed to start video call:', err);
    }
  };

  const answerCall = () => {
    setCallAccepted(true);
    setIsVideoCall(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream!,
    });

    peer.on('signal', (data) => {
      socketRef.current?.emit('answerCall', { signal: data, to: caller });
    });

    peer.on('stream', (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallAccepted(false);
    setIsVideoCall(false);
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
  };

  return (
    <div className="flex h-screen bg-[#f5f7fb]">
      {/* Left: User List - Premium Design */}
      <div className="w-80 bg-white border-r border-[#e2e8f0] flex flex-col shadow-sm">
        <div className="p-6 bg-gradient-to-r from-[#4361ee] to-[#3a0ca3]">
          <h2 className="text-xl font-semibold text-white">Investor Network</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {users
            .filter((user) => user.role === 'Investor')
            .map((user) => (
              <div
                key={user.id}
                className={`p-4 cursor-pointer flex items-center space-x-4 transition-all duration-200 ${
                  selectedUser?.id === user.id 
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                    {user.full_name.charAt(0)}
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800 truncate">{user.full_name}</div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <span className="truncate">{user.role}</span>
                    <span className="mx-2">•</span>
                    <span className="text-green-500">Active</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Right: Chat Window - Premium Design */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Premium Chat Header */}
            <div className="p-4 bg-white border-b border-[#e2e8f0] flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                    {selectedUser.full_name.charAt(0)}
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{selectedUser.full_name}</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <span className="text-green-500">Online</span>
                    <span className="mx-2">•</span>
                    <span>Investor</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={startVideoCall} 
                  className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                  title="Video Call"
                >
                  <FaVideo className="text-lg" />
                </button>
                <button 
                  className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                  title="Audio Call"
                >
                  <FaPhoneAlt className="text-lg" />
                </button>
                <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                  <FaEllipsisV />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              className="flex-1 p-6 overflow-y-auto bg-[#f5f7fb] bg-opacity-50"
              style={{ backgroundImage: 'linear-gradient(rgba(245, 247, 251, 0.9), rgba(245, 247, 251, 0.9)), url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-16c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm-36 36c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-16c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm36 16c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-16c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zM14 40c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-16c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z\' fill=\'%23e2e8f0\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex mb-4 ${msg.sender_id === Number(userId) ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${msg.sender_id === Number(userId) 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm'}`}
                  >
                    <div className="text-sm">{msg.message}</div>
                    <div className={`flex items-center justify-end mt-1 space-x-1 ${
                      msg.sender_id === Number(userId) ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      <span className="text-xs">
                        {format(new Date(msg.timestamp), 'h:mm a')}
                      </span>
                      {msg.sender_id === Number(userId) && (
                        <span className="text-xs">
                          {msg.status === 'read' ? (
                            <FaCheckDouble className="text-blue-200" />
                          ) : msg.status === 'delivered' ? (
                            <FaCheckDouble className="text-blue-200 opacity-50" />
                          ) : (
                            <FaCheck className="text-blue-200 opacity-50" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {typingStatus && (
                <div className="flex mb-4 justify-start">
                  <div className="max-w-xs px-4 py-2 bg-white text-gray-800 rounded-2xl rounded-bl-none shadow-sm">
                    <div className="text-sm italic text-gray-500">{typingStatus}</div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input - Premium Design */}
            <div className="p-4 bg-white border-t border-[#e2e8f0]">
              <div className="flex items-center space-x-2">
                <input
                  className="flex-1 border border-gray-200 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  value={newMessage}
                  onChange={handleTyping}
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center shadow-md"
                  onClick={sendMessage}
                >
                  <FaPaperPlane className="text-lg" />
                </button>
              </div>
            </div>

            {/* Video Call Section */}
            {(isVideoCall || caller) && (
              <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-4xl flex flex-col items-center">
                  {caller && !callAccepted && (
                    <div className="mb-6 bg-white p-4 rounded-lg">
                      <p className="text-lg mb-4">Incoming call...</p>
                      <button 
                        onClick={answerCall}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-200 mr-4"
                      >
                        Answer Call
                      </button>
                      <button 
                        onClick={() => setCaller(null)}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-200"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-6">
                    <div className="relative bg-gray-800 rounded-xl overflow-hidden border-2 border-blue-500">
                      <video 
                        ref={myVideo} 
                        playsInline 
                        muted 
                        autoPlay 
                        className="w-full h-auto max-h-[60vh] object-cover"
                      />
                      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        You
                      </div>
                    </div>
                    <div className="relative bg-gray-800 rounded-xl overflow-hidden border-2 border-indigo-500">
                      <video 
                        ref={userVideo} 
                        playsInline 
                        autoPlay 
                        className="w-full h-auto max-h-[60vh] object-cover"
                      />
                      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        {selectedUser.full_name}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={leaveCall} 
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg transition-all duration-200"
                  >
                    <FaPhoneAlt className="transform rotate-135" />
                    <span>End Call</span>
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-[#f5f7fb]">
            <div className="text-center p-6 max-w-md">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center mx-auto mb-6">
                <FaUserCircle className="text-5xl text-blue-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-600 mb-2">No conversation selected</h3>
              <p className="text-gray-400">Select an investor from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;