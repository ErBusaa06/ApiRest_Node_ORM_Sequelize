import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modelsDir = path.join(__dirname, 'models');
const servicesDir = path.join(__dirname, 'services');
const controllersBaseDir = path.join(__dirname, 'controllers', 'base');
const controllersDir = path.join(__dirname, 'controllers');
const routesDir = path.join(__dirname, 'routes');

const ensureDirectoryExistence = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

const createService = (name) => {
    const servicePath = path.join(servicesDir, `${name}Service.js`);
    if (fs.existsSync(servicePath)) return;

    const content = `import ${name.charAt(0).toUpperCase() + name.slice(1)} from '../models/${name}.js';

const findAll = async () => {
    return await ${name.charAt(0).toUpperCase() + name.slice(1)}.findAll();
};

const findById = async (id) => {
    return await ${name.charAt(0).toUpperCase() + name.slice(1)}.findByPk(id);
};

const create = async (data) => {
    return await ${name.charAt(0).toUpperCase() + name.slice(1)}.create(data);
};

const update = async (id, data) => {
    const item = await ${name.charAt(0).toUpperCase() + name.slice(1)}.findByPk(id);
    if (!item) return null;
    return await item.update(data);
};

const remove = async (id) => {
    const item = await ${name.charAt(0).toUpperCase() + name.slice(1)}.findByPk(id);
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
`;
    fs.writeFileSync(servicePath, content);
    console.log(`Creado servicio: ${name}Service.js`);
};

const createBaseController = (name) => {
    const controllerPath = path.join(controllersBaseDir, `${name}BaseController.js`);
    if (fs.existsSync(controllerPath)) return;

    const content = `import ${name}Service from '../../services/${name}Service.js';

const getAll = async (req, res) => {
    try {
        const items = await ${name}Service.findAll();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const item = await ${name}Service.findById(req.params.id);
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
        const newItem = await ${name}Service.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const updatedItem = await ${name}Service.update(req.params.id, req.body);
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
        const deleted = await ${name}Service.remove(req.params.id);
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
`;
    fs.writeFileSync(controllerPath, content);
    console.log(`Creado base controller: ${name}BaseController.js`);
};

const createController = (name) => {
    const controllerPath = path.join(controllersDir, `${name}Controller.js`);
    if (fs.existsSync(controllerPath)) return;

    const content = `import * as ${name}BaseController from './base/${name}BaseController.js';

export default {
    ...${name}BaseController
};
`;
    fs.writeFileSync(controllerPath, content);
    console.log(`Creado controller: ${name}Controller.js`);
};

const createRoute = (name) => {
    const routePath = path.join(routesDir, `${name}Routes.js`);
    if (fs.existsSync(routePath)) return;

    const content = `import express from 'express';
import ${name}Controller from '../controllers/${name}Controller.js';

const router = express.Router();

router.get('/${name}', ${name}Controller.getAll);
router.get('/${name}/:id', ${name}Controller.getById);
router.post('/${name}', ${name}Controller.create);
router.put('/${name}/:id', ${name}Controller.update);
router.delete('/${name}/:id', ${name}Controller.remove);

export default router;
`;
    fs.writeFileSync(routePath, content);
    console.log(`Creado route: ${name}Routes.js`);
};

const run = () => {
    if (!fs.existsSync(modelsDir)) {
        console.error('La carpeta models no existe.');
        return;
    }

    ensureDirectoryExistence(servicesDir);
    ensureDirectoryExistence(controllersBaseDir);
    ensureDirectoryExistence(controllersDir);
    ensureDirectoryExistence(routesDir);

    const files = fs.readdirSync(modelsDir);
    files.forEach(file => {
        if (file.endsWith('.js')) {
            const name = file.replace('.js', '');
            console.log(`Procesando modelo: ${name}`);
            createService(name);
            createBaseController(name);
            createController(name);
            createRoute(name);
        }
    });

    console.log('AutoCRUD finalizado. Recuerda registrar las nuevas rutas en server.js si es necesario.');
};

run();
