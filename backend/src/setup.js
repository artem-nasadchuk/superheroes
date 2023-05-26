import dotenv from 'dotenv';
import sequelize from './utils/db.js';
import './models/Superhero.js';

dotenv.config();

sequelize.sync({ force: true });
