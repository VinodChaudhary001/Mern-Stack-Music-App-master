// middleware/authMiddleware.js

function AuthMiddleware(req, res, next) {
    // Check if user is authenticated
    if (req.isAuthenticated()) {
      // If authenticated, proceed to the next middleware/route handler
      return next();
    } else {
      // If not authenticated, respond with a 401 Unauthorized status
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }
  
  module.exports = AuthMiddleware;
  