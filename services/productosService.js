import Productos from '../models/productos.js';

const findAll = async () => {
  return await Productos.findAll();
};

const findById = async (id) => {
  return await Productos.findByPk(id);
};

const create = async (data) => {
  return await Productos.create(data);
};

const update = async (id, data) => {
  const item = await Productos.findByPk(id);
  if (!item) return null;
  return await item.update(data);
};

const remove = async (id) => {
  const item = await Productos.findByPk(id);
  if (!item) return null;
  return await item.destroy();
};

export default {
  findAll,
  findById,
  create,
  update,
  remove
};
