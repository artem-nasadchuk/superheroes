import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Superhero = sequelize.define(
  'Superhero',
  {
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    realName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    superpowers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    catchPhrase: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'superheroes',
    timestamps: true,
  },
);

export default Superhero;
