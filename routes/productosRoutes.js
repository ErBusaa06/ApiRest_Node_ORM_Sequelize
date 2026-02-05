import express from 'express';
import productosController from '../controllers/productosController.js';

const router = express.Router();

router.get('/', productosController.getAll);
router.get('/:id', productosController.getById);
router.post('/', productosController.create);
router.put('/:id', productosController.update);
router.delete('/:id', productosController.remove);

export default router;
