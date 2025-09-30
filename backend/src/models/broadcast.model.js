// models/newsletterBroadcast.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

const NewsletterBroadcast = sequelize.define(
  'NewsletterBroadcast',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
        notEmpty: true,
      },
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    htmlContent: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    sentBy: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: 'Admin ID who sent the broadcast',
    },
    recipientCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: 'Number of subscribers who received this broadcast',
    },
    successCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: 'Number of emails successfully sent',
    },
    failureCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: 'Number of emails that failed',
    },
    status: {
      type: DataTypes.ENUM('draft', 'sending', 'completed', 'failed'),
      defaultValue: 'draft',
    },
    sentAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        fields: ['sentBy'],
      },
      {
        fields: ['status'],
      },
      {
        fields: ['sentAt'],
      },
    ],
  }
);

export default NewsletterBroadcast;