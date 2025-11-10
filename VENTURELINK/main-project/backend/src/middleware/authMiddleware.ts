import { Request, Response, NextFunction } from 'express';

// Middleware to authenticate token
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(403).json({ message: 'Access denied' });
  }

  // Example: Here you should verify the token (e.g., using JWT)
  // For demonstration, we're using a simple token check
  if (token !== "valid-token") {
    return res.status(403).json({ message: 'Invalid token' });
  }

  // If the token is valid, you can attach user info to the request object
  // req.user = decodedUserData;  // Replace with decoded user data after JWT verification
  next();  // Proceed to the next middleware or route handler
};

export default authenticateToken;
