import { getConnection } from '../database/connection.js';
import sql from 'mssql';

export const createEstadoOrden = async (req, res) => {
    try {
        const { nombre } = req.body;

        const query = `
            INSERT INTO EstadosOrdenes (nombre)
            VALUES (@nombre)
        `;

        const pool = await getConnection();
        await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .query(query);

        res.status(201).send('EstadoOrden creado exitosamente.');
    } catch (error) {
        res.status(500).send('Error al crear el EstadoOrden: ' + error.message);
    }
};

export const updateEstadoOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const query = `
            UPDATE EstadosOrdenes
            SET nombre = @nombre
            WHERE idEstadosOrdenes = @id
        `;

        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.VarChar, nombre)
            .query(query);

        res.send('EstadoOrden actualizado exitosamente.');
    } catch (error) {
        res.status(500).send('Error al actualizar el EstadoOrden: ' + error.message);
    }
};