import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // Adjust the import path as necessary

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized - No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      // Ensure decoded token has a userId
      return res.status(401).json({ message: 'Unauthorized - Invalid token.' });
    }

    // Sequelize equivalent of Mongoose's findById.
    // findByPk is used for finding by the primary key (PK).
    // The attributes option is used to select specific columns. We exclude 'passwordHash'.
    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ['passwordHash'] },
    });

    if (!user) {
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
      });
      return res.status(404).json({ message: 'User not found.' });
    }

    req.user = user; // User is authenticated, attach to request object
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.log('Error in protectRoute middleware: ', error.message);

    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    });

    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError'
    ) {
      return res
        .status(401)
        .json({ message: 'Unauthorized - Invalid or expired token.' });
    }

    return res.status(500).json({ message: 'Internal server error.' });
  }
};
