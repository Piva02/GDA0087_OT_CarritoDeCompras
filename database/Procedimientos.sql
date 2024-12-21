
/* ------------------------------ Procedimiento para Insertar Usuarios ----------------------------------*/

CREATE PROCEDURE InsertarUsuario
    @rol_idRol INT,
    @estados_idEstados INT,
    @nombre_completo VARCHAR(100),
    @correo_electronico VARCHAR(100),
    @password VARCHAR(45),
    @telefono VARCHAR(45),
    @fecha_nacimiento DATE
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        
        INSERT INTO Usuarios (
            rol_idRol,
            estados_idEstados,
            nombre_completo,
            correo_electronico,
            password,
            telefono,
            fecha_nacimiento
        )
        VALUES (
            @rol_idRol,
            @estados_idEstados,
            @nombre_completo,
            @correo_electronico,
            @password,
            @telefono,
            @fecha_nacimiento
        );

        PRINT 'Usuario insertado exitosamente.';
    END TRY
    BEGIN CATCH
       
        PRINT 'Error al insertar el usuario.';
        THROW;
    END CATCH
END;
GO

EXEC InsertarUsuario
    @rol_idRol = 1,
    @estados_idEstados = 1,
    @nombre_completo = 'Carlos Santana',
    @correo_electronico = 'usuario6@ejemplo.com',
    @password = 'Testuser6',
    @telefono = '44444444',
    @fecha_nacimiento = '1993-05-01';

GO


/* ------------------------------ Procedimiento para Inactivar productos ----------------------------------*/

CREATE PROCEDURE InactivarProducto
    @idProducto int,
    @idEstado int

AS
BEGIN
    set NOCOUNT ON;
    update Productos
    set idEstado = @idEstado
    WHERE idProducto = @idProducto;

if @@ROWCOUNT = 0
BEGIN
    print 'No se encontro el producto con el id ingresado';
    END
    else
    BEGIN
        print 'Actualizacion exitosa';
    END
END;
GO

EXEC InactivarProducto @idProducto = 3, @idEstado = 2;
GO

/* ------------------------------ Procedimiento para Insertar productos ----------------------------------*/

CREATE PROCEDURE InsertarProducto
    @idCategoria INT,
    @marca VARCHAR(45),
    @modelo VARCHAR(45),
    @codigo VARCHAR(45),
    @stock FLOAT,
    @idEstado INT,
    @precio FLOAT,
    @idUsuario INT
AS
BEGIN
    INSERT INTO Productos (idCategoria, marca, modelo, codigo, stock, idEstado, precio, idUsuario)
    VALUES ( @idCategoria, @marca, @modelo, @codigo, @stock, @idEstado, @precio, @idUsuario);
END;
Go

exec InsertarProducto 5, 'Samsung', '43 in', '5004', 6, 1, 1999, 3;
exec InsertarProducto 4, 'Lenovo', 'Ryzen 3', '4004', 4, 1, 3995, 5;
exec InsertarProducto 3, 'Motorola', 'Edge 40', '3001', 4, 1, 3999, 5;
exec InsertarProducto 3, 'Samsung', 'A15', '3003', 8, 1, 1499, 3;
GO

/* ------------------------- Procedimiento para Insertar Ordenes | Detalles Orden usando OPENJSON ----------------------*/

CREATE PROCEDURE InsertarOrdenConDetalles
    @usuarios_idusuarios INT,
    @estados_idEstadosOrdenes INT,
    @nombre_completo VARCHAR(100),
    @direccion VARCHAR(245),
    @telefono VARCHAR(45),
    @correo_electronico VARCHAR(100),
    @fecha_entrega DATE,
    @detalles NVARCHAR(MAX) 
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        
        BEGIN TRANSACTION;

       
        INSERT INTO Orden (
            usuarios_idusuarios,
            estados_idEstadosOrdenes,
            nombre_completo,
            direccion,
            telefono,
            correo_electronico,
            fecha_entrega,
            total_orden
        )
        VALUES (
            @usuarios_idusuarios,
            @estados_idEstadosOrdenes,
            @nombre_completo,
            @direccion,
            @telefono,
            @correo_electronico,
            @fecha_entrega,
            0 
        );

        
        DECLARE @idOrden INT = SCOPE_IDENTITY();

       
        INSERT INTO OrdenDetalles (
            Orden_idOrden,
            Productos_idProductos,
            cantidad,
            precio
        )
        SELECT
            @idOrden AS Orden_idOrden,
            detalles.idProducto,
            detalles.cantidad,
            detalles.precio

        FROM OPENJSON(@detalles, '$.detalles')
        WITH (
            idProducto INT '$.idProducto',
            cantidad INT '$.cantidad',
            precio FLOAT '$.precio'
        ) AS detalles;

     
        DECLARE @totalOrden FLOAT;
        SELECT @totalOrden = SUM(cantidad * precio)
        FROM OrdenDetalles
        WHERE Orden_idOrden = @idOrden;

        UPDATE Orden
        SET total_orden = @totalOrden
        WHERE idOrden = @idOrden;

        COMMIT TRANSACTION;

        PRINT 'Orden y detalles insertados exitosamente.';
    END TRY
    BEGIN CATCH
        
        ROLLBACK TRANSACTION;

        PRINT 'Error al insertar la orden y los detalles.';
        THROW;
    END CATCH
END;
GO

/* -------------------------------------------------- Llamada de JSON ----------------------*/
DECLARE @detalles NVARCHAR(MAX) = '{
    "detalles": [
        {
            "idProducto": 6,
            "cantidad": 1,
            "precio": 3999
        },
        {
            "idProducto": 2,
            "cantidad": 1,
            "precio": 5999
        }
    ]
}';

EXEC InsertarOrdenConDetalles
    @usuarios_idusuarios = 4,
    @estados_idEstadosOrdenes = 1,
    @nombre_completo = 'Fito Paez',
    @direccion = 'Zona 3, Ciudad de Guatemala',
    @telefono = '35874620',
    @correo_electronico = 'usuario4@ejemplo.com',
    @fecha_entrega = '2024-12-22',
    @detalles = @detalles;

select * from Orden;

select * from OrdenDetalles;
GO

DECLARE @detalles NVARCHAR(MAX) = '{
    "detalles": [
        {
            "idProducto": 7,
            "cantidad": 1,
            "precio": 1499
        },
        {
            "idProducto": 1,
            "cantidad": 1,
            "precio": 245
        },
         {
            "idProducto": 3,
            "cantidad": 2,
            "precio": 179
        }
    ]
}';

EXEC InsertarOrdenConDetalles
    @usuarios_idusuarios = 8,
    @estados_idEstadosOrdenes = 1,
    @nombre_completo = 'Alejandro Sanz',
    @direccion = 'Zona 15, Ciudad de Guatemala',
    @telefono = '38395567',
    @correo_electronico = 'usuario5@ejemplo.com',
    @fecha_entrega = '2024-12-16',
    @detalles = @detalles;

select * from Orden;

select * from OrdenDetalles;

