import {Router} from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
} from '../controllers/productos.controller.js';

const router = Router();

router.get('/lista',  getProductos);
router.get('/:id', getProductoById);
router.post('/crear', verifyToken, createProducto);
router.put('/update/:id', verifyToken, updateProducto);
router.delete('/eliminar/:id', verifyToken, deleteProducto);

export default router;