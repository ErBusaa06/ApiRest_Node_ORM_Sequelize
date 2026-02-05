import express from 'express';
import logsController from '../controllers/logsController.js';

const router = express.Router();

// Las rutas ahora son relativas al prefijo '/logs' que pusiste en server.js
router.get('/', logsController.getAll);
router.get('/:id', logsController.getById);
router.post('/', logsController.create);
router.put('/:id', logsController.update);
router.delete('/:id', logsController.remove);

export default router;
