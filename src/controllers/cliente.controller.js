import { getConnection } from '../database/connection.js';
import sql from 'mssql';

export const createCliente = async (req, res) => {
    try {
        const { razon_social, nombre_comercial, direccion_entrega, telefono, email } = req.body;

        const query = `
            INSERT INTO Clientes (razon_social, nombre_comercial, direccion_entrega, telefono, email)
            OUTPUT INSERTED.idClientes
            VALUES (@razon_social, @nombre_comercial, @direccion_entrega, @telefono, @email)
        `;

        const pool = await getConnection();
        const result = await pool.request()
            .input('razon_social', razon_social)
            .input('nombre_comercial', nombre_comercial)
            .input('direccion_entrega', direccion_entrega)
            .input('telefono', telefono)
            .input('email', email)
            .query(query);

        res.status(201).json({ idClientes: result.recordset[0].idClientes, message: 'Cliente creado exitosamente.' });
    } catch (error) {
        res.status(500).send('Error al crear el cliente: ' + error.message);
    }
};

export const updateCliente = async (req, res) => {
    try {
        const { id } = req.params; 
        const {
            razon_social,
            nombre_comercial,
            direccion_entrega,
            telefono,
            email,
        } = req.body; 

        const query = `
            UPDATE Clientes
            SET 
                razon_social = @razon_social,
                nombre_comercial = @nombre_comercial,
                direccion_entrega = @direccion_entrega,
                telefono = @telefono,
                email = @email
            WHERE idClientes = @id
        `;

        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .input('razon_social', sql.VarChar, razon_social)
            .input('nombre_comercial', sql.VarChar, nombre_comercial)
            .input('direccion_entrega', sql.VarChar, direccion_entrega)
            .input('telefono', sql.VarChar, telefono)
            .input('email', sql.VarChar, email)
            .query(query);

        res.send('Cliente actualizado exitosamente');
    } catch (error) {
        res.status(500).send('Error al actualizar el cliente: ' + error.message);
    }
};