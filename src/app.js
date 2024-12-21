import express from 'express';
import cors from 'cors';
import productosRoutes from './routes/productos.routes.js';
import categoriasRoutes from './routes/categorias.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import estadosRoutes from './routes/estados.routes.js';
import clienteRoutes from './routes/cliente.routes.js';
import ordenRoutes from './routes/orden.routes.js';


const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Solicitud entrante: ${req.method} ${req.url}`);
    next();
});


app.use('/api/productos', productosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/estados', estadosRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/ordenes', ordenRoutes);

export default app;
