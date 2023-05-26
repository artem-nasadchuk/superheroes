import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { superheroRouter } from './routes/superheroRouter.js';

dotenv.config();

const app = express();
const { PORT } = process.env || 5000;

app.use(cors());
app.use(express.json());
app.use(superheroRouter);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
