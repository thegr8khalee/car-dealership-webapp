import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

const Car = sequelize.define(
  'Car',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    make: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
        notEmpty: true,
      },
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
        notEmpty: true,
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1900,
        max: new Date().getFullYear() + 2,
      },
    },
    bodyType: {
      type: DataTypes.ENUM(
        'sedan',
        'coupe',
        'hatchback',
        'suv',
        'crossover',
        'truck',
        'convertible',
        'wagon',
        'minivan',
        'sports_car',
        'luxury',
        'electric',
        'hybrid'
      ),
      allowNull: true,
    },
    fuelType: {
      type: DataTypes.ENUM('gasoline', 'diesel', 'electric', 'hybrid', 'hydrogen'),
      allowNull: true,
    },
    transmission: {
      type: DataTypes.ENUM('manual', 'automatic', 'cvt', 'dual_clutch'),
      allowNull: true,
    },
    engineSize: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true,
    },
    horsepower: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    torque: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    drivetrain: {
      type: DataTypes.ENUM('fwd', 'rwd', 'awd', '4wd'),
      allowNull: true,
    },
    msrp: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imageUrls: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      validate: {
        isArrayOfStrings(value) {
          if (value && !Array.isArray(value)) {
            throw new Error('imageUrls must be an array');
          }
          if (value && value.some(url => typeof url !== 'string')) {
            throw new Error('All imageUrls must be strings');
          }
        }
      }
    },
    sold: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    interior: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      validate: {
        isArrayOfStrings(value) {
          if (value && !Array.isArray(value)) {
            throw new Error('interior must be an array');
          }
          if (value && value.some(url => typeof url !== 'string')) {
            throw new Error('All interior must be strings');
          }
        }
      }
    },
    exterior: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      validate: {
        isArrayOfStrings(value) {
          if (value && !Array.isArray(value)) {
            throw new Error('exterior must be an array');
          }
          if (value && value.some(url => typeof url !== 'string')) {
            throw new Error('All exterior must be strings');
          }
        }
      }
    },
    comfort: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      validate: {
        isArrayOfStrings(value) {
          if (value && !Array.isArray(value)) {
            throw new Error('comfort must be an array');
          }
          if (value && value.some(url => typeof url !== 'string')) {
            throw new Error('All comfort must be strings');
          }
        }
      }
    },
    safety: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      validate: {
        isArrayOfStrings(value) {
          if (value && !Array.isArray(value)) {
            throw new Error('safety must be an array');
          }
          if (value && value.some(url => typeof url !== 'string')) {
            throw new Error('All safety must be strings');
          }
        }
      }
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        fields: ['make'],
      },
      {
        fields: ['model'],
      },
      {
        fields: ['year'],
      },
      {
        fields: ['bodyType'],
      },
    ],
  }
);

export default Car;
