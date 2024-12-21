import { getConnection } from '../database/connection.js';
import sql from 'mssql';


export const createOrdenConDetalles = async (req, res) => {
    const transaction = new sql.Transaction(await getConnection());
    try {
        const {
            usuarios_idusuarios,
            estados_idEstadosOrdenes,
            nombre_completo,
            direccion,
            telefono,
            correo_electronico,
            fecha_entrega,
            detalles, 
        } = req.body;

        await transaction.begin();

        
        const result = await transaction.request()
            .input('usuarios_idusuarios', sql.Int, usuarios_idusuarios)
            .input('estados_idEstadosOrdenes', sql.Int, estados_idEstadosOrdenes)
            .input('nombre_completo', sql.VarChar, nombre_completo)
            .input('direccion', sql.VarChar, direccion)
            .input('telefono', sql.VarChar, telefono)
            .input('correo_electronico', sql.VarChar, correo_electronico)
            .input('fecha_entrega', sql.Date, fecha_entrega)
            .query(`
                INSERT INTO Orden (
                    usuarios_idusuarios,
                    estados_idEstadosOrdenes,
                    nombre_completo,
                    direccion,
                    telefono,
                    correo_electronico,
                    fecha_entrega
                )
                VALUES (
                    @usuarios_idusuarios,
                    @estados_idEstadosOrdenes,
                    @nombre_completo,
                    @direccion,
                    @telefono,
                    @correo_electronico,
                    @fecha_entrega
                );
                SELECT SCOPE_IDENTITY() AS idOrden;
            `);

        const idOrden = result.recordset[0].idOrden;

        
        let totalOrden = 0;
        for (const detalle of detalles) {
            const subtotal = detalle.cantidad * detalle.precio;
            totalOrden += subtotal;

            await transaction.request()
                .input('Orden_idOrden', sql.Int, idOrden)
                .input('Productos_idProductos', sql.Int, detalle.Productos_idProductos)
                .input('cantidad', sql.Int, detalle.cantidad)
                .input('precio', sql.Float, detalle.precio)
                .query(`
                    INSERT INTO OrdenDetalles (
                        Orden_idOrden,
                        Productos_idProductos,
                        cantidad,
                        precio
                    )
                    VALUES (
                        @Orden_idOrden,
                        @Productos_idProductos,
                        @cantidad,
                        @precio
                    );
                `);
        }

       
        await transaction.request()
            .input('idOrden', sql.Int, idOrden)
            .input('totalOrden', sql.Float, totalOrden)
            .query(`
                UPDATE Orden
                SET total_orden = @totalOrden
                WHERE idOrden = @idOrden;
            `);

        await transaction.commit();
        res.status(201).json({
            message: 'Orden y detalles creados exitosamente',
            idOrden,
            totalOrden,
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).send('Error al crear la orden y sus detalles: ' + error.message);
    }
};




// Actualizar una Orden (Solo encabezado)
export const updateOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            estados_idEstadosOrdenes,
            nombre_completo,
            direccion,
            telefono,
            correo_electronico,
            fecha_entrega,
            total_orden,
        } = req.body;

        const query = `
            UPDATE Orden
            SET 
                estados_idEstadosOrdenes = @estados_idEstadosOrdenes,
                nombre_completo = @nombre_completo,
                direccion = @direccion,
                telefono = @telefono,
                correo_electronico = @correo_electronico,
                fecha_entrega = @fecha_entrega,
                total_orden = @total_orden
            WHERE idOrden = @id;
        `;

        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .input('estados_idEstadosOrdenes', sql.Int, estados_idEstadosOrdenes)
            .input('nombre_completo', sql.VarChar, nombre_completo)
            .input('direccion', sql.VarChar, direccion)
            .input('telefono', sql.VarChar, telefono)
            .input('correo_electronico', sql.VarChar, correo_electronico)
            .input('fecha_entrega', sql.Date, fecha_entrega)
            .input('total_orden', sql.Float, total_orden)
            .query(query);

        res.send('Orden actualizada exitosamente');
    } catch (error) {
        res.status(500).send('Error al actualizar la Orden: ' + error.message);
    }
};
