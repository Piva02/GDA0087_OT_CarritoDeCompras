import { Router } from 'express';
import { createOrdenConDetalles,  updateOrden } from '../controllers/orden.controller.js';

const router = Router();


router.post('/crear', createOrdenConDetalles);

router.put('/update/:id', updateOrden);

export default router;


