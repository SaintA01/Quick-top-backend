import { verifyToken } from '../lib/auth.js';
import { usersDB } from '../lib/db.js';

export const authenticate = (handler) => {
  return async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          message: 'Access denied. No token provided.'
        });
      }

      const token = authHeader.substring(7); // Remove "Bearer " prefix
      
      try {
        const decoded = verifyToken(token);
        const user = usersDB.findById(decoded.userId);
        
        if (!user) {
          return res.status(401).json({
            success: false,
            message: 'Invalid token. User not found.'
          });
        }

        // Add user to request object
        req.user = user;
        return handler(req, res);
      } catch (error) {
        return res.status(401).json({
          success: false,
          message: 'Invalid token.'
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Authentication error'
      });
    }
  };
};
