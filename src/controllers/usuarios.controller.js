import { getConnection } from '../database/connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sql from 'mssql';

export const loginUsuario = async (req, res) => {
    console.log('Entrando a loginUsuario');

    try {
        const { correo_electronico, password } = req.body;
        console.log('Datos recibidos:', correo_electronico, password);

        const pool = await getConnection();
        console.log('Conexión a la base de datos establecida');

        const result = await pool.request()
            .input('correo_electronico', correo_electronico)
            .query('SELECT * FROM Usuarios WHERE correo_electronico = @correo_electronico');

        console.log('Resultado de la consulta:', result.recordset);

        const usuario = result.recordset[0];
        if (!usuario) {
            console.log('Usuario no encontrado');
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if (!isPasswordValid) {
            console.log('Contraseña incorrecta');
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }

        const token = jwt.sign(
            { idUsuario: usuario.idUsuario, rol_idRol: usuario.rol_idRol },
            'yourSecretKey',
            { expiresIn: '24h' }
        );

        console.log('Token generado:', token);
        res.json({ token });
    } catch (error) {
        console.error('Error en loginUsuario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

       
export const getUsuarios = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query ('SELECT * FROM Usuarios');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios: ' + error.message);
    }
};

export const getUsuarioById = async (req, res) => {
    try {
        const {id} = req.params;
        const pool = await getConnection();
        const result = await pool.request().input('id', sql.Int, id).query('SELECT * FROM Usuarios WHERE idUsuario = @id');
        res.json(result.recordset[0]||{});
    } catch (error) {
        res.status(500).send('Error al obtener el usuario: ' + error.message);
    }
};

export const createUsuario = async (req, res) => {
    try {
        const { rol_idRol, estados_idEstados, idClientes, nombre_completo, correo_electronico, password, telefono, fecha_nacimiento } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO Usuarios (rol_idRol, estados_idEstados, idClientes, nombre_completo, correo_electronico, password, telefono, fecha_nacimiento)
            VALUES (@rol_idRol, @estados_idEstados, @idClientes, @nombre_completo, @correo_electronico, @password, @telefono, @fecha_nacimiento)
        `;

        const pool = await getConnection();
        await pool.request()
            .input('rol_idRol', rol_idRol)
            .input('estados_idEstados', estados_idEstados)
            .input('idClientes', idClientes)
            .input('nombre_completo', nombre_completo)
            .input('correo_electronico', correo_electronico)
            .input('password', hashedPassword)
            .input('telefono', telefono)
            .input('fecha_nacimiento', fecha_nacimiento)
            .query(query);

        res.status(201).send('Usuario creado exitosamente.');
    } catch (error) {
        res.status(500).send('Error al crear el usuario: ' + error.message);
    }
};

export const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params; // ID del usuario que se desea actualizar
        const { estados_idEstados, correo_electronico, telefono } = req.body;

        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .input('estados_idEstados', sql.Int, estados_idEstados)
            .input('correo_electronico', sql.VarChar, correo_electronico)
            .input('telefono', sql.VarChar, telefono)
            .query(`
                UPDATE Usuarios 
                SET estados_idEstados = @estados_idEstados, 
                    correo_electronico = @correo_electronico, 
                    telefono = @telefono
                WHERE idUsuario = @id
            `);

        res.send('Usuario actualizado exitosamente');
    } catch (error) {
        res.status(500).send('Error al actualizar usuario: ' + error.message);
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        const {id} = req.params;
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Usuarios WHERE id = @id');
            readdirSync.send('Usuario eliminado exitosamente');
    } catch (error) {
        res.result(500).send('Error al eliminar usuario: ' + error.message);
    }
};
