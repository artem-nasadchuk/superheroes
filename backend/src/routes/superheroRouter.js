import express from 'express';
import { superheroController } from '../controllers/superheroController.js';

export const superheroRouter = new express.Router();

superheroRouter.post('/superheroes', superheroController.createSuperhero);
superheroRouter.get('/superheroes', superheroController.getAllSuperheroes);
superheroRouter.delete('/superheroes/:id', superheroController.deleteSuperhero);
