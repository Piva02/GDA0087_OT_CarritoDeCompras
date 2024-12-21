import {getConnection} from '../database/connection.js';
import sql from 'mssql';

export const getProductos = async (req, res) => {
    try {
        const pool = await getConnectioin();
        const result = await pool.request().query('SELECT * FROM Productos');
        res.json(result.recordset);
        
    } catch (error) {
        res.status(500).send('Erro al obtener los productos: ' + error.message);
    }
};

export const getProductoById = async (req, res) => {
    try {
        const {id} = req.params;
        const pool = await getConnection();
        const result = await pool.request().input('id', sql.Int, id).query('SELECT * FROM Productos WHERE idProducto = @id');
        res.json(result.recordset[0]||{});
    } catch (error) {
        res.status(500).send('Error al obtener el producto: ' + error.message);
    }
};

export const createProducto = async (req, res) => {
    try {
        const { idCategoria, marca, modelo, codigo, stock, idEstado, precio, idUsuario} = req.body;
        const query = 'INSERT INTO Productos (idCategoria, marca, modelo, codigo, stock, idEstado, precio, idUsuario) VALUES (@idCategoria, @marca, @modelo, @codigo, @stock, @idEstado, @precio, @idUsuario)';
        const pool = await getConnection();
        await pool.request()
            .input('idCategoria', idCategoria)
            .input('marca', marca)
            .input('modelo', modelo)
            .input('codigo', codigo)
            .input('stock', stock)
            .input('idEstado', idEstado)
            .input('precio', precio)
            .input('idUsuario', idUsuario)
            .query(query);
            res.json({message: 'Producto creado'});
    } catch (error) {
        res.status(500).send('Error al crear Producto: ' + error.message);
    }
};

export const updateProducto = async (req, res) => {
    try {
        const { id } = req.params; // ID del producto que se actualizará
        const { stock, idEstado, precio, idUsuario } = req.body; // Campos a actualizar

        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .input('stock', sql.Float, stock)
            .input('idEstado', sql.Int, idEstado)
            .input('precio', sql.Float, precio)
            .input('idUsuario', sql.Int, idUsuario)
            .query(`
                UPDATE Productos
                SET stock = @stock,
                    idEstado = @idEstado,
                    precio = @precio,
                    idUsuario = @idUsuario
                WHERE idProducto = @id
            `);

        res.send('Producto actualizado exitosamente');
    } catch (error) {
        res.status(500).send('Error al actualizar el Producto: ' + error.message);
    }
};

export const deleteProducto = async (req, res)=> {
    try{
        const {id} = req.params;
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Productos WHERE idProducto = @id');
            readdirSync.send('Producto eliminado exitosamente');
    } catch (error) {
        res.result(500).send('Error al eliminar el producto: ' + error.message);
    }
};
