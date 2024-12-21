import { getConnection } from '../database/connection.js';
import sql from 'mssql';

export const getCategorias = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM CategoriaProductos');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send('Error al obtener las categorias" ' + error.message);
    }
};

export const getCategoriasById = async (req, res) => {
    try {
        const {id} = req.params;
        const pool = await getConnection();
        const result = await pool.request().input('id', sql.Int, id).query('SELECT * FROM CategoriaProductos WHERE idCategoriaProductos = @id');
        res.json(result.recordset[0] || {});
    } catch (error) {
        res.status(500).send('Error al obtener la categoria: ' + error.message);
    }
};

export const createCategoria = async (req, res) => {
    try {
        const {nombre, estados_idestados, idUsuario} = req.body;
        const query = 'INSERT INTO CategoriaProductos (nombre, estados_idestados, idUsuario) VALUES (@nombre,@estados_idestados,@idUsuario)';
        const pool = await getConnection();
        await pool.request()
            .input('nombre', nombre)
            .input('estados_idestados', estados_idestados)
            .input('idUsuario', idUsuario)
            .query(query);
        res.status(201).send('Categoria creada exitosamente');
    } catch (error) {
        res.status(500).send('Error al crear la categoria: ' + error.message);
    }
};

export const updateCategoria = async (req, res) => {
    try {
        const { id } = req.params; // ID de la categoría que se actualizará
        const { nombre, estados_idestados, idUsuario } = req.body; // Campos que se actualizarán

        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.VarChar, nombre)
            .input('estados_idestados', sql.Int, estados_idestados)
            .input('idUsuario', sql.Int, idUsuario)
            .query(`
                UPDATE CategoriaProductos
                SET nombre = @nombre,
                    estados_idestados = @estados_idestados,
                    idUsuario = @idUsuario
                WHERE idCategoriaProductos = @id
            `);

        res.send('Categoría actualizada exitosamente');
    } catch (error) {
        res.status(500).send('Error al actualizar la categoría: ' + error.message);
    }
};

export const deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM CategoriaProductos WHERE idCategoriaProductos = @id');
        res.send('Categoría eliminada exitosamente');
    } catch (error) {
        res.status(500).send('Error al eliminar la categoría: ' + error.message);
    }
};