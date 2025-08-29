// models/associations.js
import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';
import User from './user.model.js';
import Admin from './admin.model.js';
import Car from './car.model.js';
import Blog from './blog.model.js';
import Comment from './comment.model.js';
import Like from './like.model.js';
import Newsletter from './news.model.js';

// Blog associations
Blog.belongsTo(Admin, { 
  foreignKey: 'authorId', 
  as: 'author',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
});
Admin.hasMany(Blog, { 
  foreignKey: 'authorId', 
  as: 'blogs',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
});

// Many-to-Many association between Blog and Car (using carIds array)
const BlogCar = sequelize.define('BlogCar', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  blogId: {
    type: DataTypes.UUID,
    references: {
      model: 'Blogs',
      key: 'id',
    },
  },
  carId: {
    type: DataTypes.UUID,
    references: {
      model: 'Cars',
      key: 'id',
    },
  },
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['blogId', 'carId'],
    },
  ],
});

Blog.belongsToMany(Car, { 
  through: BlogCar, 
  foreignKey: 'blogId',
  otherKey: 'carId',
  as: 'cars',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Car.belongsToMany(Blog, { 
  through: BlogCar, 
  foreignKey: 'carId',
  otherKey: 'blogId',
  as: 'blogs',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Comment associations
Comment.belongsTo(Blog, { 
  foreignKey: 'blogId', 
  as: 'blog',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Blog.hasMany(Comment, { 
  foreignKey: 'blogId', 
  as: 'comments',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Comment.belongsTo(User, { 
  foreignKey: 'userId', 
  as: 'user',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
User.hasMany(Comment, { 
  foreignKey: 'userId', 
  as: 'comments',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Like associations
Like.belongsTo(User, { 
  foreignKey: 'userId', 
  as: 'user',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
User.hasMany(Like, { 
  foreignKey: 'userId', 
  as: 'likes',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Like.belongsTo(Blog, { 
  foreignKey: 'blogId', 
  as: 'blog',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Blog.hasMany(Like, { 
  foreignKey: 'blogId', 
  as: 'likes',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Like.belongsTo(Comment, { 
  foreignKey: 'commentId', 
  as: 'comment',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Comment.hasMany(Like, { 
  foreignKey: 'commentId', 
  as: 'likes',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Export all models and the junction table
export {
  User,
  Admin,
  Car,
  Blog,
  Comment,
  Like,
  Newsletter,
  BlogCar
};

// Export a function to initialize all associations
export const initializeAssociations = () => {
  console.log('All model associations have been initialized');
};

export default {
  User,
  Admin,
  Car,
  Blog,
  Comment,
  Like,
  Newsletter,
  BlogCar,
  initializeAssociations
};