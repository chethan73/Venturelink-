// import { Server } from "socket.io";
// import { Server as HttpServer } from "http";

// // Store connected users: { userId: socketId }
// const users: Record<string, string> = {};

// export function initializeSocket(server: HttpServer) {
//     const io = new Server(server, { cors: { origin: "*" } });

//     io.on("connection", (socket) => {
//         console.log(`✅ New connection: ${socket.id}`);

//         // Register user with their socket ID
//         socket.on("register", (userId: string) => {
//             if (userId) {
//                 users[userId] = socket.id;
//                 console.log(`🔵 User registered: ${userId} -> ${socket.id}`);
//             } else {
//                 console.warn(`⚠️ Invalid userId received`);
//             }
//         });

//         // Handle user disconnection
//         socket.on("disconnect", () => {
//             const userId = Object.keys(users).find((key) => users[key] === socket.id);
//             if (userId) {
//                 delete users[userId];
//                 console.log(`❌ User disconnected: ${userId} (${socket.id})`);
//             } else {
//                 console.log(`❌ Unknown user disconnected: ${socket.id}`);
//             }
//         });
//     });

//     return { io, users };
// }


// import { Server as SocketIOServer } from "socket.io";
// import { Server as HttpServer } from "http";

// // Track connected users with their socket IDs
// const users: Record<string, string> = {};

// export function initializeSocket(server: HttpServer) {
//   const io = new SocketIOServer(server, {
//     cors: {
//       origin: "*", // Replace with your frontend origin in production
//       credentials: true,
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log(`✅ New connection: ${socket.id}`);

//     // Listen for user registration
//     socket.on("register", (userId: string) => {
//       if (userId) {
//         users[userId] = socket.id;
//         console.log(`🔵 Registered user: ${userId} -> ${socket.id}`);
//       } else {
//         console.warn("⚠️ Invalid userId received during registration");
//       }
//     });

//     // Handle disconnection
//     socket.on("disconnect", () => {
//       const userId = Object.keys(users).find((key) => users[key] === socket.id);
//       if (userId) {
//         delete users[userId];
//         console.log(`❌ User disconnected: ${userId} (${socket.id})`);
//       } else {
//         console.log(`❌ Unknown socket disconnected: ${socket.id}`);
//       }
//     });
//   });

//   return { io, users };
// }


import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";

// Track connected users with their socket IDs
const users: Record<string, string> = {};

export function initializeSocket(server: HttpServer) {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*", // Replace with your frontend origin in production
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`✅ New connection: ${socket.id}`);

    // Listen for user registration
    socket.on("register", (userId: string) => {
      console.log(`🔵 Registering user: ${userId}`);
      if (userId) {
        users[userId] = socket.id;
        console.log(`Registered user: ${userId} -> ${socket.id}`);
      } else {
        console.warn("⚠️ Invalid userId received during registration");
      }
    });

    // Helper function to emit events to the target user
    const emitToUser = (event: string, targetUserId: string, data: any) => {
      if (users[targetUserId]) {
        console.log(`📡 Emitting ${event} from ${socket.id} to ${targetUserId}`);
        io.to(users[targetUserId]).emit(event, data);
      } else {
        console.warn(`⚠️ User with ID ${targetUserId} not connected`);
      }
    };

    // Listen for WebRTC offer
    socket.on("offer", (data) => {
      if (data && data.targetUserId && data.offer) {
        console.log(`📞 Forwarding offer from ${socket.id} to ${data.targetUserId}`);
        emitToUser("offer", data.targetUserId, data.offer);
      } else {
        console.warn("⚠️ Invalid offer data received");
      }
    });

    // Listen for WebRTC answer
    socket.on("answer", (data) => {
      if (data && data.targetUserId && data.answer) {
        console.log(`📞 Forwarding answer from ${socket.id} to ${data.targetUserId}`);
        emitToUser("answer", data.targetUserId, data.answer);
      } else {
        console.warn("⚠️ Invalid answer data received");
      }
    });

    // Listen for ICE candidates
    socket.on("candidate", (data) => {
      if (data && data.targetUserId && data.candidate) {
        console.log(`📞 Forwarding ICE candidate from ${socket.id} to ${data.targetUserId}`);
        emitToUser("candidate", data.targetUserId, data.candidate);
      } else {
        console.warn("⚠️ Invalid candidate data received");
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      const userId = Object.keys(users).find((key) => users[key] === socket.id);
      if (userId) {
        delete users[userId];
        console.log(`❌ User disconnected: ${userId} (${socket.id})`);
      } else {
        console.log(`❌ Unknown socket disconnected: ${socket.id}`);
      }
    });
  });

  return { io, users };
}
