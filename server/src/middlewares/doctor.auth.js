const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res, next) => {
  try {
    // Get the token from the request header
    const authHeader = req.header('Authorization');

    // Check if the Authorization header exists
    if (!authHeader) {
      return res.status(401).json({ msg: 'No authorization header present' });
    }

    // Check if the header starts with "Bearer "
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'Invalid authorization format' });
    }

    // Extract the token without "Bearer "
    const token = authHeader.substring(7);

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if the user's ID is in the user table
      const user = await User.findOne({ where: { userId: decoded.userId } });

      if (!user) {
        return res.status(401).json({ msg: 'User not found in the user table' });
      }

      // Check if the user's userType is "doctor"
      if (user.userType !== 'doctor') {
        return res.status(403).json({ msg: 'User is not a doctor' });
      }

      // Attach the user data from the token to the request object
      req.user = decoded;

      // Continue to the next middleware or route handler
      next();
    } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  } catch (error) {
    console.error('Error in auth middleware:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
