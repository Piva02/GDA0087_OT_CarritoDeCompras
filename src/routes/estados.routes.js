import { Router } from 'express';
import { createEstadoOrden, updateEstadoOrden } from '../controllers/estados.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();


router.post('/crear', verifyToken, createEstadoOrden);


router.put('/update/:id', verifyToken, updateEstadoOrden);

export default router;
