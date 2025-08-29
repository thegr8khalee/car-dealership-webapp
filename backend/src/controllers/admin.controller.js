import Admin from '../models/admin.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import { Op } from 'sequelize';
import cloudinary from '../lib/cloudinary.js';

export const adminSignup = async (req, res) => {
  const { username, email, password, position, role, avatar, bio } = req.body;

  try {
    // Validate required fields
    if (!username || !email || !password || !position) {
      return res.status(400).json({
        message:
          'All required fields (username, email, password, position) are required.',
      });
    }

    // Check if admin with this email or username already exists
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

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let avatarUrl = null;
    // If an avatar is provided, upload it to Cloudinary
    if (avatar) {
      const uploadResponse = await cloudinary.uploader.upload(avatar, {
        upload_preset: 'your_upload_preset', // Replace with your unsigned upload preset
      });
      avatarUrl = uploadResponse.secure_url;
    }

    // Create the new admin with all fields
    const newAdmin = await Admin.create({
      username,
      email,
      passwordHash,
      position,
      role,
      avatar: avatarUrl, // Store the Cloudinary URL
      bio,
    });

    // Generate and set the JWT token
    generateToken(newAdmin.id, res, 'admin');

    // Respond with the new admin's details
    res.status(201).json({
      id: newAdmin.id,
      username: newAdmin.username,
      email: newAdmin.email,
      position: newAdmin.position,
      role: newAdmin.role,
      avatar: newAdmin.avatar,
      bio: newAdmin.bio,
      createdAt: newAdmin.createdAt,
      updatedAt: newAdmin.updatedAt,
      message: 'Admin registered successfully.',
    });
  } catch (error) {
    console.error('Error in adminSignup controller:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required for admin login.' });
    }

    // Find the admin by email
    const admin = await Admin.findOne({ where: { email } });

    // Check if admin exists
    if (!admin) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Compare the provided password with the stored hash
    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin.passwordHash
    );

    // Check if the password is correct
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Generate and set the JWT token
    generateToken(admin.id, res, 'admin');

    // Respond with the admin's details including the role
    res.status(200).json({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role, // This line has been updated
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
