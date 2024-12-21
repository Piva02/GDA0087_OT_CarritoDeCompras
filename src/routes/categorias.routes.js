import {Router} from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import {
    getCategorias,
    getCategoriasById,
    createCategoria,
    updateCategoria,
    deleteCategoria,
} from '../controllers/categorias.controller.js';

const router = Router();

router.get('/lista', getCategorias);
router.get('/:id', getCategoriasById);
router.post('/crear', verifyToken, createCategoria);
router.put('/update/:id', verifyToken,updateCategoria);
router.delete('/eliminar/:id', deleteCategoria);

export default router;