import express from 'express';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.js';
import { superheroController } from '../controllers/superheroController.js';

export const superheroRouter = new express.Router();

superheroRouter.post('/superheroes', uploadMiddleware(3), superheroController.createSuperhero);
superheroRouter.get('/superheroes', superheroController.getAllSuperheroes);
superheroRouter.get('/superheroes/:id', superheroController.getSuperheroById);
superheroRouter.put('/superheroes/:id', superheroController.updateSuperhero);
superheroRouter.delete('/superheroes/:id', superheroController.deleteSuperhero);
superheroRouter.post('/superheroes/:id/images', superheroController.uploadImages);
superheroRouter.delete('/superheroes/:id/images/:imageId', superheroController.removeImage);
