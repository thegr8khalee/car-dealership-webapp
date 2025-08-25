// middleware/adminAuthMiddleware.js
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';

export const protectAdminRoute = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.jwt;
    // console.log('Admin token:', token);

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Not authorized, no token provided.' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token is valid and contains 'admin' role
    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized, invalid token or insufficient privileges.',
      });
    }

    // Find the admin user by ID from the decoded token.
    // Use Sequelize's findByPk and the 'attributes' option to exclude sensitive data.
    const admin = await Admin.findByPk(decoded.userId, {
      attributes: { exclude: ['passwordHash'] },
    });

    if (!admin) {
      return res.status(404).json({ message: 'Admin user not found.' });
    }

    // Attach the admin object to the request for subsequent middleware/controllers
    req.admin = admin;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error in protectAdminRoute middleware: ', error.message);
    // Handle different JWT errors (e.g., TokenExpiredError, JsonWebTokenError)
    if (error.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({ message: 'Not authorized, token expired.' });
    } else if (error.name === 'JsonWebTokenError') {
      return res
        .status(401)
        .json({ message: 'Not authorized, invalid token.' });
    }
    res
      .status(500)
      .json({ message: 'Internal Server Error during token verification.' });
  }
};
