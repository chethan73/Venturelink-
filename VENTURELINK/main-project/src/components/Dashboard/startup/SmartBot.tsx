// 'use client';

// import React, { useState } from "react";

// const SmartBot = () => {
//   const [userMessage, setUserMessage] = useState("");
//   const [botReply, setBotReply] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSend = async () => {
//     if (!userMessage.trim()) return;  // Prevent empty messages
//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:8000/api/smart_bot", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: userMessage }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch from backend");
//       }

//       const data = await response.json();
//       setBotReply(data.reply);
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-semibold mb-6 text-gray-800">Chat with SmartBot</h2>

//       {/* Chat Container */}
//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg space-y-6 overflow-auto">
//         <div className="flex flex-col space-y-4">
//           {/* Display User and Bot Messages */}
//           <div className="flex flex-col space-y-2">
//             {/* User message */}
//             {userMessage && (
//               <div className="flex justify-end">
//                 <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
//                   {userMessage}
//                 </div>
//               </div>
//             )}

//             {/* Bot reply */}
//             {botReply && (
//               <div className="flex justify-start">
//                 <div className="bg-gray-300 text-gray-800 p-3 rounded-lg max-w-xs animate-pulse">
//                   {botReply}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Loading Indicator */}
//         {loading && (
//           <div className="text-center text-gray-500">
//             <span className="animate-pulse">Bot is thinking...</span>
//           </div>
//         )}

//         {/* Message input and Send button */}
//         <div className="flex items-center space-x-4 mt-4">
//           <input
//             type="text"
//             value={userMessage}
//             onChange={(e) => setUserMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1 p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={handleSend}
//             className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SmartBot;


//   'use client';

//  import React, { useState } from "react";
// import axios from "axios";

// const Chatbot: React.FC = () => {
//   const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { sender: "user", text: input };
//     setMessages([...messages, userMsg]);

//     try {
//       const res = await axios.post("http://localhost:8000/api/chat", {
//         message: input,
//       });
//       const botMsg = { sender: "bot", text: res.data.answer };
//       setMessages((msgs) => [...msgs, botMsg]);
//     } catch {
//       setMessages((msgs) => [...msgs, { sender: "bot", text: "Server error. Try again later." }]);
//     }

//     setInput("");
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
//       <h1 className="text-2xl font-bold mb-4">💬 VentureBot</h1>
//       <div className="h-80 overflow-y-auto bg-gray-50 p-2 rounded mb-4">
//         {messages.map((msg, idx) => (
//           <div key={idx} className={`my-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
//             <span
//               className={`inline-block px-3 py-2 rounded-lg ${
//                 msg.sender === "user" ? "bg-blue-200" : "bg-green-200"
//               }`}
//             >
//               {msg.text}
//             </span>
//           </div>
//         ))}
//       </div>
//       <div className="flex">
//         <input
//           className="flex-1 border px-3 py-2 rounded-l"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Ask me anything..."
//         />
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded-r"
//           onClick={sendMessage}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;

"use client";

import React, { useState, useRef, useEffect } from 'react';

const SmartBot = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ user: string; bot: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Sample VentureLink questions
  const relatedQuestions = [
    "How does VentureLink help with fundraising?",
    "What industries does VentureLink focus on?",
    "Can you explain VentureLink's due diligence process?",
    "How do I create a pitch deck for VentureLink?"
  ];

  // Initialize voice recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setMessage(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Voice recognition error', event.error);
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = message;
    setMessage('');
    setLoading(true);
    setChat((prevChat) => [...prevChat, { user: userMsg, bot: '...' }]);

    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();
      const botReply = data.reply || 'No answer received.';

      setChat((prevChat) => {
        const updated = [...prevChat];
        updated[updated.length - 1].bot = botReply;
        return updated;
      });
    } catch (error) {
      setChat((prevChat) => {
        const updated = [...prevChat];
        updated[updated.length - 1].bot = 'Server error.';
        return updated;
      });
    }

    setLoading(false);
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-gray-800">VentureLink AI Assistant</h1>
            </div>
            <div className="animate-pulse flex items-center">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm text-gray-500">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full p-4">
        {chat.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full animate-fade-in">
            <div className="w-full max-w-2xl">
              <div className="bg-white rounded-xl shadow-xs p-6 mb-6 transition-all duration-300 hover:shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Welcome to VentureLink AI</h2>
                </div>
                <p className="text-gray-600 mb-6">Ask me anything about VentureLink's platform, investment process, or startup resources.</p>
                
                {/* Related Questions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {relatedQuestions.map((question, index) => (
                    <button 
                      key={index}
                      onClick={() => setMessage(question)}
                      className="text-left p-4 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 hover:border-blue-200 transition-all duration-200 flex items-start"
                    >
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{question}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Getting Started Section */}
              <div className="bg-white rounded-xl shadow-xs p-6 transition-all duration-300 hover:shadow-sm">
                <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Getting Started
                </h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setMessage("How do I create an investor profile on VentureLink?")}
                    className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-gray-700 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Investor profile setup
                  </button>
                  <button 
                    onClick={() => setMessage("What are the requirements for startups to join VentureLink?")}
                    className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-gray-700 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Startup requirements
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {chat.map((entry, idx) => (
              <div key={idx} className="space-y-2 animate-fade-in">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="max-w-[80%] bg-blue-600 text-white rounded-xl rounded-br-none px-4 py-2 flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200 mr-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{entry.user}</span>
                  </div>
                </div>
                
                {/* Bot message */}
                <div className="flex justify-start">
                  <div className="max-w-[80%] bg-white border border-gray-200 rounded-xl rounded-bl-none px-4 py-2 flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {entry.bot === '...' ? (
                      <div className="flex space-x-1 items-center">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    ) : (
                      <span>{entry.bot}</span>
                    )}
                  </div>
                </div>

                {/* Show related questions after bot response */}
                {idx === chat.length - 1 && !loading && entry.bot !== '...' && entry.bot !== 'Server error.' && (
                  <div className="pt-4 animate-fade-in">
                    <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Related questions:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {relatedQuestions.slice(0, 3).map((question, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => setMessage(question)}
                          className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors duration-150 flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative flex items-center">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`absolute left-3 p-1 rounded-full ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-500 hover:text-blue-600'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isListening ? "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" : "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"} />
              </svg>
            </button>
            <input
              type="text"
              className="flex-1 pl-12 pr-12 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={isListening ? "Listening..." : "Ask about VentureLink..."}
            />
            {message && (
              <button
                onClick={() => setMessage('')}
                className="absolute right-12 p-1 text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              className="absolute right-2 p-2 rounded-lg bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors duration-200"
            >
              {loading ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            SmartBot may produce inaccurate information
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmartBot;