import logsService from '../../services/logsService.js';

const getAll = async (req, res) => {
  try {
    const items = await logsService.findAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const item = await logsService.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Recurso no encontrado' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const newItem = await logsService.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updatedItem = await logsService.update(req.params.id, req.body);
    if (!updatedItem) {
      return res.status(404).json({ error: 'Recurso no encontrado' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await logsService.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Recurso no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAll,
  getById,
  create,
  update,
  remove
};
