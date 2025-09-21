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

// Get all admins (Super Admin only)
export const getAllAdmins = async (req, res) => {
  try {
    // Check permissions
    if (!hasPermission(req.admin.role, 'manage_admins')) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions to view admin accounts',
      });
    }

    const { page, limit, sortBy, sortOrder } = sanitizeQueryParams(req.query);
    const offset = (page - 1) * limit;

    const { count, rows: admins } = await Admin.findAndCountAll({
      attributes: [
        'id',
        'username',
        'email',
        'position',
        'role',
        'avatar',
        'bio',
        'createdAt',
        'updatedAt',
      ],
      limit,
      offset,
      order: [[sortBy || 'createdAt', sortOrder || 'DESC']],
    });

    res.status(200).json({
      success: true,
      data: {
        admins,
        pagination: {
          totalItems: count,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          itemsPerPage: limit,
        },
      },
    });
  } catch (error) {
    console.error('Error in getAllAdmins:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching admin accounts',
      error: error.message,
    });
  }
};

// Get admin by ID
export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    // Allow admins to view their own profile or super_admin to view any
    if (
      req.admin.id !== id &&
      !hasPermission(req.admin.role, 'manage_admins')
    ) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions to view this admin account',
      });
    }

    const admin = await Admin.findByPk(id, {
      attributes: [
        'id',
        'username',
        'email',
        'position',
        'role',
        'avatar',
        'bio',
        'createdAt',
        'updatedAt',
      ],
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin account not found',
      });
    }

    res.status(200).json({
      success: true,
      data: { admin },
    });
  } catch (error) {
    console.error('Error in getAdminById:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching admin account',
      error: error.message,
    });
  }
};

// Update admin profile
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, position, role, bio, avatar } = req.body;

    // Allow admins to update their own profile or super_admin to update any
    if (
      req.admin.id !== id &&
      !hasPermission(req.admin.role, 'manage_admins')
    ) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions to update this admin account',
      });
    }

    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin account not found',
      });
    }

    // Only super_admin can change roles
    const updateData = { username, email, position, bio, avatar };
    if (hasPermission(req.admin.role, 'manage_admins') && role) {
      updateData.role = role;
    }

    // Check for unique constraints
    if (email && email !== admin.email) {
      const emailExists = await Admin.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use by another admin',
        });
      }
    }

    if (username && username !== admin.username) {
      const usernameExists = await Admin.findOne({ where: { username } });
      if (usernameExists) {
        return res.status(400).json({
          success: false,
          message: 'Username already taken',
        });
      }
    }

    await admin.update(updateData);

    const updatedAdmin = {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      position: admin.position,
      role: admin.role,
      bio: admin.bio,
      avatar: admin.avatar,
      updatedAt: admin.updatedAt,
    };

    res.status(200).json({
      success: true,
      message: 'Admin account updated successfully',
      admin: updatedAdmin,
    });
  } catch (error) {
    console.error('Error in updateAdmin:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating admin account',
      error: error.message,
    });
  }
};

// Change admin password
export const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    // Only allow admins to change their own password
    if (req.admin.id !== id) {
      return res.status(403).json({
        success: false,
        message: 'You can only change your own password',
      });
    }

    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin account not found',
      });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      admin.passwordHash
    );
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    // Validate new password
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long',
      });
    }

    // Hash new password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    await admin.update({ passwordHash });

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.error('Error in changePassword:', error);
    res.status(500).json({
      success: false,
      message: 'Error changing password',
      error: error.message,
    });
  }
};

// Delete admin (Super Admin only)
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Check permissions
    if (!hasPermission(req.admin.role, 'manage_admins')) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions to delete admin accounts',
      });
    }

    // Prevent self-deletion
    if (req.admin.id === id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account',
      });
    }

    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin account not found',
      });
    }

    await admin.destroy();

    res.status(200).json({
      success: true,
      message: 'Admin account deleted successfully',
    });
  } catch (error) {
    console.error('Error in deleteAdmin:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting admin account',
      error: error.message,
    });
  }
};
