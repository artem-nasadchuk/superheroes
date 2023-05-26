import Superhero from '../models/Superhero.js';

async function createSuperhero(req, res) {
  try {
    const {
      nickname, realName, originDescription, superpowers, catchPhrase,
    } = req.body;
    const image = req.file ? req.file.filename : null;

    // Create a new superhero in the database
    const superhero = await Superhero.create({
      nickname,
      realName,
      originDescription,
      superpowers,
      catchPhrase,
      image,
    });

    res.status(201).send(superhero);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create superhero' });
  }
}

async function getAllSuperheroes(req, res) {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const offset = (page - 1) * limit;

    const { count, rows } = await Superhero.findAndCountAll({
      limit,
      offset,
    });

    const superheroes = rows.map((superhero) => ({
      id: superhero.id,
      nickname: superhero.nickname,
    }));

    res.send(superheroes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteSuperhero(req, res) {
  try {
    const { id } = req.params;

    const superhero = await Superhero.findByPk(id);

    if (!superhero) {
      return res.status(404).json({ message: 'Superhero not found' });
    }

    await superhero.destroy();

    return res.json({ message: 'Superhero deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export const superheroController = { createSuperhero, getAllSuperheroes, deleteSuperhero };
