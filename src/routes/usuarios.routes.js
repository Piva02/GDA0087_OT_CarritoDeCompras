import { Router } from "express";
import { loginUsuario } from '../controllers/usuarios.controller.js';

import {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
  
} from '../controllers/usuarios.controller.js';
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/login', loginUsuario);
router.get('/lista', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/crear', verifyToken, createUsuario);
router.put('/update/:id', verifyToken, updateUsuario);
router.delete('/eliminar/:id', verifyToken, deleteUsuario);



export default router;