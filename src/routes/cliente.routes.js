import {Router} from 'express';
import { createCliente, updateCliente } from '../controllers/cliente.controller.js';


const router = Router();


router.post('/crear', createCliente);
router.put('/update/:id', updateCliente);

export default router;