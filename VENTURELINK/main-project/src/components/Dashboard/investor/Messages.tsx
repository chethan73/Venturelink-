// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { FaUser, FaVideo, FaMicrophone, FaPhoneSlash } from "react-icons/fa";
// import io from "socket.io-client";

// interface Startup {
//   id: number;
//   full_name: string;
//   email: string;
//   number: string;
//   sector: string;
//   role: string;
// }

// interface Message {
//   id?: number;
//   text: string;
//   fromMe: boolean;
//   from: number;
//   to: number;
// }

// const socket = io("http://localhost:5000");

// const Messages = () => {
//   const [startups, setStartups] = useState<Startup[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
//   const [message, setMessage] = useState<string>("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inCall, setInCall] = useState<boolean>(false);
//   const [callType, setCallType] = useState<"video" | "voice" | null>(null);

//   const localVideoRef = useRef<HTMLVideoElement | null>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
//   const peerConnection = useRef<RTCPeerConnection | null>(null);

//   useEffect(() => {
//     socket.on("receiveMessage", (data: Message) => {
//       setMessages((prevMessages) => [...prevMessages, { ...data, fromMe: false }]);
//     });
//   }, []);

//   useEffect(() => {
//     const fetchStartups = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/getall");
//         const startupUsers = response.data.data.filter((user: Startup) => user.role === "Startup");
//         setStartups(startupUsers);
//       } catch (error) {
//         setError("Failed to fetch startups");
//       }
//     };
//     fetchStartups();
//   }, []);

//   const fetchMessages = async () => {
//     if (!selectedStartup) return;
//     try {
//       const response = await axios.get(`http://localhost:5000/get-messages?from=1&to=${selectedStartup.id}`);
//       setMessages(response.data.data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   useEffect(() => {
//     if (selectedStartup) {
//       fetchMessages();
//     }
//   }, [selectedStartup]);

//   const sendMessage = async () => {
//     if (!selectedStartup || !message.trim()) return;

//     const newMessage: Message = { text: message, fromMe: true, from: 1, to: selectedStartup.id };

//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//     setMessage("");

//     try {
//       await axios.post("http://localhost:5000/send-message", {
//         message: newMessage.text,
//         from: newMessage.from,
//         to: newMessage.to,
//       });

//       socket.emit("sendMessage", newMessage);
//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }
//   };

//   const startCall = async (type: "video" | "voice") => {
//     setInCall(true);
//     setCallType(type);
//     peerConnection.current = new RTCPeerConnection();
//     const stream = await navigator.mediaDevices.getUserMedia({ video: type === "video", audio: true });
//     if (localVideoRef.current) {
//       localVideoRef.current.srcObject = stream;
//     }
//     stream.getTracks().forEach((track) => peerConnection.current!.addTrack(track, stream));
//     peerConnection.current.ontrack = (event) => {
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       }
//     };
//   };

//   const endCall = () => {
//     setInCall(false);
//     setCallType(null);
//     if (peerConnection.current) {
//       peerConnection.current.getSenders().forEach((sender) => peerConnection.current!.removeTrack(sender));
//       peerConnection.current.close();
//       peerConnection.current = null;
//     }
//     if (localVideoRef.current?.srcObject) {
//       (localVideoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
//       localVideoRef.current.srcObject = null;
//     }
//     if (remoteVideoRef.current?.srcObject) {
//       (remoteVideoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
//       remoteVideoRef.current.srcObject = null;
//     }
//   };

//   return (
//     <div className="flex p-4 space-x-4">
//       <div className="w-full md:w-1/3">
//         <h1 className="text-2xl font-bold mb-4">Startup List</h1>
//         {error && <p className="text-red-500">{error}</p>}
//         <ul className="space-y-4">
//           {startups.map((startup) => (
//             <li
//               key={startup.id}
//               className="p-4 bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:bg-blue-50"
//               onClick={() => setSelectedStartup(startup)}
//             >
//               <div className="flex items-center space-x-4">
//                 <FaUser className="text-blue-500 text-xl" />
//                 <div>
//                   <p className="font-semibold">{startup.full_name}</p>
//                   <p className="text-sm text-gray-500">{startup.sector}</p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="w-full md:w-2/3 p-4 bg-gray-50 rounded-lg shadow-md">
//         {selectedStartup ? (
//           <>
//             <h2 className="text-xl font-semibold">Chat with {selectedStartup.full_name}</h2>
//             <div className="h-96 overflow-y-auto bg-white p-4 rounded-md">
//               {messages.map((msg, idx) => (
//                 <div key={idx} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}>
//                   <div className={`p-4 max-w-xs rounded-xl ${msg.fromMe ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
//                     {msg.text}
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="flex items-center space-x-2 mt-2">
//               <textarea
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 className="w-full p-2 border rounded-md"
//                 placeholder="Type your message..."
//               />
//               <button onClick={sendMessage} className="p-2 bg-blue-500 text-white rounded-md">
//                 Send
//               </button>
//             </div>
//             <div className="flex mt-4 space-x-4">
//               <button onClick={() => startCall("video")} className="p-2 bg-green-500 text-white rounded-md">
//                 <FaVideo /> Video Call
//               </button>
//               <button onClick={() => startCall("voice")} className="p-2 bg-yellow-500 text-white rounded-md">
//                 <FaMicrophone /> Voice Call
//               </button>
//             </div>
//           </>
//         ) : (
//           <p>Select a startup to start chatting</p>
//         )}
//       </div>
//       {inCall && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90">
//           <video ref={localVideoRef} autoPlay playsInline className="w-1/2 bg-black" />
//           <button onClick={endCall} className="absolute top-5 right-5 p-3 bg-red-600 text-white rounded-full shadow-lg">
//             <FaPhoneSlash />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Messages;


// 'use client';
// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { io, Socket } from 'socket.io-client';
// import { FaUserCircle, FaPaperPlane, FaVideo, FaPhoneAlt, FaEllipsisV } from 'react-icons/fa';
// import Peer from 'simple-peer';
// import { format } from 'date-fns';

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
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [isVideoCall, setIsVideoCall] = useState(false);
//   const [caller, setCaller] = useState<string | null>(null);
//   const [callerSignal, setCallerSignal] = useState<any>(null);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [callConfirmationMessage, setCallConfirmationMessage] = useState('');

//   const socketRef = useRef<Socket | null>(null);
//   const userId = localStorage.getItem('user_id');
//   const myVideo = useRef<HTMLVideoElement>(null);
//   const userVideo = useRef<HTMLVideoElement>(null);
//   const connectionRef = useRef<any>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Scroll to bottom of messages
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Initialize socket
//   useEffect(() => {
//     if (!userId) return;

//     socketRef.current = io('http://localhost:5000');
//     socketRef.current.emit('join', userId);

//     socketRef.current.on('receive_message', (msg: Message) => {
//       if (msg.sender_id === selectedUser?.id || msg.receiver_id === selectedUser?.id) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     });

//     socketRef.current.on('receive_call', ({ from, signal }) => {
//       setCaller(from);
//       setCallerSignal(signal);
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

//   // Start Video Call
//   const startVideoCall = () => {
//     if (!selectedUser || !userId) return;

//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
//       setStream(currentStream);
//       if (myVideo.current) {
//         myVideo.current.srcObject = currentStream;
//       } else {
//         console.error('My video element not found!');
//       }

//       const peer = new Peer({
//         initiator: true,
//         trickle: false,
//         stream: currentStream,
//       });

//       peer.on('signal', (data) => {
//         socketRef.current?.emit('call_user', {
//           userToCall: selectedUser.id,
//           signalData: data,
//           from: userId,
//         });
//       });

//       peer.on('stream', (currentStream) => {
//         if (userVideo.current) {
//           userVideo.current.srcObject = currentStream;
//         } else {
//           console.error('User video element not found!');
//         }
//       });

//       socketRef.current?.on('call_accepted', (signal) => {
//         setCallAccepted(true);
//         peer.signal(signal);
//       });

//       connectionRef.current = peer;
//       setIsVideoCall(true);

//       setCallConfirmationMessage(`Video call started: Your ID = ${userId}, Selected User ID = ${selectedUser.id}`);
//     }).catch((error) => {
//       console.error('Error getting media devices:', error);
//     });
//   };

//   // Answer Video Call
//   const answerVideoCall = () => {
//     if (!callerSignal) return;

//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
//       setStream(currentStream);
//       if (myVideo.current) {
//         myVideo.current.srcObject = currentStream;
//       }

//       const peer = new Peer({
//         initiator: false,
//         trickle: false,
//         stream: currentStream,
//       });

//       peer.on('signal', (data) => {
//         socketRef.current?.emit('answer_call', {
//           signal: data,
//           to: caller,
//         });
//       });

//       peer.on('stream', (currentStream) => {
//         if (userVideo.current) {
//           userVideo.current.srcObject = currentStream;
//         }
//       });

//       peer.signal(callerSignal);
//       connectionRef.current = peer;
//       setCallAccepted(true);
//       setIsVideoCall(true);

//       setCallConfirmationMessage(`Video call answered: Your ID = ${userId}, Caller ID = ${caller}`);
//     }).catch((error) => {
//       console.error('Error getting media devices:', error);
//     });
//   };

//   const leaveCall = () => {
//     setIsVideoCall(false);
//     setCallAccepted(false);
//     connectionRef.current.destroy();
//     setStream(null);
//     setCaller(null);
//     setCallerSignal(null);
//     setCallConfirmationMessage('');
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Left: User List */}
//       <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
//         <div className="p-4 bg-gray-50 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-800">Startup</h2>
//         </div>
//         <div className="flex-1 overflow-y-auto">
//           {users
//             .filter((user) => user.role === 'Startup')
//             .map((user) => (
//               <div
//                 key={user.id}
//                 className={`p-4 cursor-pointer flex items-center space-x-3 hover:bg-gray-50 transition-all duration-200 ${selectedUser?.id === user.id ? 'bg-blue-50' : ''}`}
//                 onClick={() => setSelectedUser(user)}
//               >
//                 <div className="relative">
//                   <FaUserCircle className="text-3xl text-gray-400" />
//                   <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="font-semibold text-gray-800 truncate">{user.full_name}</div>
//                   <div className="text-sm text-gray-500 truncate">{user.role}</div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* Right: Chat Window */}
//       <div className="flex-1 flex flex-col">
//         {selectedUser ? (
//           <>
//             {/* Chat Header */}
//             <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <FaUserCircle className="text-3xl text-gray-400" />
//                 <div>
//                   <div className="font-semibold text-gray-800">{selectedUser.full_name}</div>
//                   <div className="text-xs text-gray-500">Online</div>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <button 
//                   onClick={startVideoCall} 
//                   className="text-gray-600 hover:text-blue-500 transition-colors"
//                   title="Video Call"
//                 >
//                   <FaVideo className="text-xl" />
//                 </button>
//                 <button 
//                   className="text-gray-600 hover:text-blue-500 transition-colors"
//                   title="Audio Call"
//                 >
//                   <FaPhoneAlt className="text-xl" />
//                 </button>
//                 <button className="text-gray-600 hover:text-blue-500 transition-colors">
//                   <FaEllipsisV />
//                 </button>
//               </div>
//             </div>

//             {/* Messages Area */}
//             <div className="flex-1 p-4 overflow-y-auto bg-gray-50" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%239C92AC\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }}
//             >
//               {messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`flex mb-4 ${msg.sender_id === Number(userId) ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div
//                     className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender_id === Number(userId) 
//                       ? 'bg-blue-500 text-white rounded-tr-none' 
//                       : 'bg-white text-gray-800 rounded-tl-none shadow-sm'}`}
//                   >
//                     <div className="text-sm">{msg.message}</div>
//                     <div className={`text-xs mt-1 text-right ${msg.sender_id === Number(userId) ? 'text-blue-100' : 'text-gray-500'}`}>
//                       {format(new Date(msg.timestamp), 'h:mm a')}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Message Input */}
//             <div className="p-4 bg-white border-t border-gray-200">
//               <div className="flex items-center">
//                 <input
//                   className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder="Type a message..."
//                   onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//                 />
//                 <button
//                   className="ml-3 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
//                   onClick={sendMessage}
//                 >
//                   <FaPaperPlane />
//                 </button>
//               </div>
//             </div>

//             {/* Video Call Section */}
//             {isVideoCall && (
//               <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-4">
//                 <div className="w-full max-w-4xl flex flex-col items-center">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-4">
//                     <div className="relative bg-gray-800 rounded-lg overflow-hidden">
//                       <video 
//                         ref={myVideo} 
//                         playsInline 
//                         muted 
//                         autoPlay 
//                         className="w-full h-auto max-h-[60vh] object-contain"
//                       />
//                       <p className="absolute top-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded text-sm">You</p>
//                     </div>
//                     <div className="relative bg-gray-800 rounded-lg overflow-hidden">
//                       <video 
//                         ref={userVideo} 
//                         playsInline 
//                         autoPlay 
//                         className="w-full h-auto max-h-[60vh] object-contain"
//                       />
//                       <p className="absolute top-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded text-sm">{selectedUser.full_name}</p>
//                     </div>
//                   </div>
//                   <button 
//                     onClick={leaveCall} 
//                     className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 flex items-center space-x-2"
//                   >
//                     <FaPhoneAlt className="transform rotate-135" />
//                     <span>End Call</span>
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Call Confirmation Message */}
//             {callConfirmationMessage && (
//               <div className="bg-blue-50 text-blue-800 text-sm p-2 text-center">
//                 {callConfirmationMessage}
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-gray-50">
//             <div className="text-center p-6 max-w-md">
//               <FaUserCircle className="text-6xl text-gray-300 mx-auto mb-4" />
//               <h3 className="text-xl font-medium text-gray-500 mb-2">No chat selected</h3>
//               <p className="text-gray-400">Choose an investor from the sidebar to start chatting</p>
//             </div>
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
          <h2 className="text-xl font-semibold text-white">Startup Network</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {users
            .filter((user) => user.role === 'Startup')
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