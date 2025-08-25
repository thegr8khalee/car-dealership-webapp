import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

const Like = sequelize.define(
  'Like',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    blogId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Blogs',
        key: 'id',
      },
    },
    commentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Comments',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'blogId'],
        name: 'unique_user_blog_like',
      },
      {
        unique: true,
        fields: ['userId', 'commentId'],
        name: 'unique_user_comment_like',
      },
    ],
    validate: {
      eitherBlogOrComment() {
        if ((this.blogId && this.commentId) || (!this.blogId && !this.commentId)) {
          throw new Error('Like must be associated with either a blog or a comment, but not both');
        }
      },
    },
  }
);

export default Like;