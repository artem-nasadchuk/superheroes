import { Image } from '../models/Image.js';
import Superhero from '../models/Superhero.js';

async function createSuperhero(req, res) {
  const {
    nickname, realName, originDescription, superpowers, catchPhrase, images,
  } = req.body;

  const imagesPath = req.files.map((image) => image.path);

  try {
    const superhero = await Superhero.create({
      nickname,
      realName,
      originDescription,
      superpowers,
      catchPhrase,
      images: imagesPath,
    });

    res.status(201).json(superhero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllSuperheroes(req, res) {
  // const { page = 1, limit = 5 } = req.query;
  // const offset = (page - 1) * limit;

  try {
    const superheroes = await Superhero.findAll();

    res.json(superheroes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getSuperheroById(req, res) {
  const { id } = req.params;

  try {
    const superhero = await Superhero.findByPk(id, {
      include: [Image],
    });

    if (!superhero) {
      res.status(404).json({ error: 'Superhero not found' });
      return;
    }

    res.json(superhero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateSuperhero(req, res) {
  const { id } = req.params;
  const { nickname, realName, originDescription, superpowers, catchPhrase } = req.body;

  try {
    const superhero = await Superhero.findByPk(id);

    if (!superhero) {
      res.status(404).json({ error: 'Superhero not found' });
      return;
    }

    await superhero.update({
      nickname,
      realName,
      originDescription,
      superpowers,
      catchPhrase,
    });

    res.json(superhero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteSuperhero(req, res) {
  const { id } = req.params;

  try {
    const superhero = await Superhero.findByPk(id);

    if (!superhero) {
      res.status(404).json({ error: 'Superhero not found' });
      return;
    }

    // Delete associated images
    await Image.destroy({
      where: {
        superheroId: superhero.id,
      },
    });

    // Delete superhero
    await superhero.destroy();

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function uploadImages(req, res) {
  const { id } = req.params;
  const { files } = req;

  try {
    const superhero = await Superhero.findByPk(id);

    if (!superhero) {
      res.status(404).json({ error: 'Superhero not found' });
      return;
    }

    const uploadedImages = [];

    for (const file of files) {
      const image = await Image.create({
        filename: file.filename,
        superheroId: superhero.id
      });

      uploadedImages.push(image);
    }

    res.status(201).json(uploadedImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function removeImage(req, res) {
  const { id, imageId } = req.params;

  try {
    const superhero = await Superhero.findByPk(id);

    if (!superhero) {
      res.status(404).json({ error: 'Superhero not found' });
      return;
    }

    const image = await Image.findOne({
      where: {
        id: imageId,
        superheroId: superhero.id,
      },
    });

    if (!image) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }

    await image.destroy();

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const superheroController = {
  createSuperhero,
  getAllSuperheroes,
  getSuperheroById,
  deleteSuperhero,
  updateSuperhero,
  uploadImages,
  removeImage,
};
