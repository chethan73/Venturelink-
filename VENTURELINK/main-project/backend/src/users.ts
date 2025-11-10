// A shared object to store user socket connections
const users: Record<string, string> = {}; // { userId: socketId }

export default users;
