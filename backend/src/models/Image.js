import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

export const Image = sequelize.define('Image', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  superheroId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
