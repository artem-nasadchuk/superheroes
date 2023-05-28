import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';
import { Image } from './Image.js';

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
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    tableName: 'superheroes',
    timestamps: true,
  },
);

Superhero.hasMany(Image, {
  foreignKey: 'superheroId',
  onDelete: 'CASCADE',
  hooks: true,
});

export default Superhero;
