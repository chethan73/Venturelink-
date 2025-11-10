const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000", // Use environment variable for flexibility
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    }
  });

  export default io;