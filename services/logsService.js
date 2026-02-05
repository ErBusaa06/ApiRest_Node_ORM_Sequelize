import Logs from '../models/logs.js';

const findAll = async () => {
  return await Logs.findAll();
};

const findById = async (id) => {
  return await Logs.findByPk(id);
};

const create = async (data) => {
  return await Logs.create(data);
};

const update = async (id, data) => {
  const item = await Logs.findByPk(id);
  if (!item) return null;
  return await item.update(data);
};

const remove = async (id) => {
  const item = await Logs.findByPk(id);
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
