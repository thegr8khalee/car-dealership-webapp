import Admin from '../models/admin.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import { Op } from 'sequelize';

export const adminSignup = async (req, res) => {
  const { username, email, password, position } = req.body;

  try {
    if (!username || !email || !password || !position) {
      return res.status(400).json({
        message:
          'All fields (username, email, password, position) are required for admin signup.',
      });
    }

    const adminExists = await Admin.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (adminExists) {
      return res
        .status(400)
        .json({ message: 'Admin with this email or username already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = await Admin.create({
      username,
      email,
      passwordHash,
      position,
    });

    generateToken(newAdmin.id, res, 'admin');

    res.status(201).json({
      id: newAdmin.id,
      username: newAdmin.username,
      email: newAdmin.email,
      position: newAdmin.position,
      createdAt: newAdmin.createdAt,
      updatedAt: newAdmin.updatedAt,
      message: 'Admin registered successfully.',
    });
  } catch (error) {
    console.error('Error in adminSignup controller: ', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required for admin login.' });
    }

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin.passwordHash
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    generateToken(admin.id, res, 'admin');

    res.status(200).json({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: 'admin',
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
      message: 'Admin logged in successfully.',
    });
  } catch (error) {
    console.error('Error in adminLogin controller: ', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const adminLogout = (req, res) => {
  try {
    res.cookie('jwt', '', {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ message: 'Admin logged out successfully.' });
  } catch (error) {
    console.error('Error in adminLogout controller: ', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
