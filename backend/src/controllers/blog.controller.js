import Blog from '../models/blog.model.js';
import { Op } from 'sequelize';

export const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    // Use findAndCountAll to get both the blogs and the total count for pagination metadata
    const { count, rows: blogs } = await Blog.findAndCountAll({
      where: {
        status: 'published', // Only show published blogs
      },
      limit,
      offset,
      order: [['publishedAt', 'DESC']], // Order by most recent first
    });

    res.status(200).json({
      message: 'Blogs retrieved successfully',
      data: blogs,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalBlogs: count,
    });
  } catch (error) {
    console.error('Error fetching all blogs:', error);
    res.status(500).json({
      message: 'An error occurred while fetching blogs',
      error: error.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json({
      message: 'Blog post retrieved successfully',
      data: blog,
    });
  } catch (error) {
    console.error('Error fetching blog post by ID:', error);
    res.status(500).json({
      message: 'An error occurred while fetching the blog post',
      error: error.message,
    });
  }
};

export const searchBlogs = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({
        message: 'Search query cannot be empty.',
      });
    }

    const searchQuery = `%${query.trim()}%`;

    const blogs = await Blog.findAll({
      where: {
        status: 'published', // Only search within published blogs
        [Op.or]: [
          { title: { [Op.like]: searchQuery } },
          { tagline: { [Op.like]: searchQuery } },
          // Convert tags JSON array to a string for a string-based search
          sequelize.where(
            sequelize.fn(
              'JSON_UNQUOTE',
              sequelize.fn('JSON_EXTRACT', sequelize.col('tags'), '$')
            ),
            {
              [Op.like]: searchQuery,
            }
          ),
        ],
      },
      order: [['publishedAt', 'DESC']],
    });

    if (blogs.length > 0) {
      res.status(200).json({
        message: 'Blogs found successfully',
        data: blogs,
      });
    } else {
      res.status(404).json({
        message: `No blogs found matching the query: "${query}"`,
      });
    }
  } catch (error) {
    console.error('Error during blog search:', error);
    res.status(500).json({
      message: 'An error occurred while searching for blogs',
      error: error.message,
    });
  }
};
