use GDA0087_OT_ClaudiaPivaral;
insert into rol (nombre) values ('Cliente'), ('Operador');
insert into Estados (nombre) values ('Activo'), ('Inactivo');
insert into EstadosOrdenes (nombre) values ('Pendiente'),('Confirmado'), ('Cancelado'), ('Entregado');

/* insercion de datos de cliente */
INSERT INTO Clientes (razon_social, nombre_comercial, direccion_entrega, telefono, email)
VALUES ('Comercial S.A.', 'Tienda Mayorista', 'Zona 10', '55555555', 'mayorista1@ejemplo.com');

INSERT INTO Clientes (razon_social, nombre_comercial, direccion_entrega, telefono, email)
VALUES ('Tecniservicios S.A.', 'Mundo Tecnologico', 'Zona 09', '22222222', 'mayorista2@ejemplo.com');

select * from Clientes;

INSERT INTO Usuarios (rol_idRol, estados_idEstados, idClientes, nombre_completo, correo_electronico, password, telefono, fecha_nacimiento)
VALUES (1, 1, 1, 'Juan Perez Mayorista', 'usuario@ejemplo.com', 'Testuser1', '36857485', '1990-01-01');

INSERT INTO Usuarios (rol_idRol, estados_idEstados, idClientes, nombre_completo, correo_electronico, password, telefono, fecha_nacimiento)
VALUES (1, 1, 2, 'Andres Calamaro', 'usuario2@ejemplo.com', 'Testuser2', '37859485', '1999-12-10');

select * from Usuarios;

/* insercion de usuario individual (no mayorista) */


INSERT INTO Usuarios (rol_idRol, estados_idEstados, nombre_completo, correo_electronico, password, telefono, fecha_nacimiento)
VALUES (2, 1, 'Claudia Pivaral',  'operador1@ejemplo.com', 'Testoperador1', '39313494', '1981-12-02');

UPDATE Usuarios
SET nombre_completo = 'Alejandro Sanz',
    correo_electronico = 'usuario5@ejemplo.com'
WHERE idUsuario = 8;

INSERT INTO Usuarios (rol_idRol, estados_idEstados, nombre_completo, correo_electronico, password, telefono, fecha_nacimiento)
VALUES (2, 1, 'Tito Puente', 'operador2@ejemplo.com', 'Testoperador2', '22223564', '2002-03-15');

INSERT INTO Usuarios (rol_idRol, estados_idEstados, nombre_completo, correo_electronico, password, telefono, fecha_nacimiento)
VALUES (1, 1,  'Celia Cruz','usuario3@ejemplo.com', 'Testuser3', '22286469', '1978-07-05');

INSERT INTO Usuarios (rol_idRol, estados_idEstados, nombre_completo, correo_electronico, password, telefono, fecha_nacimiento)
VALUES (1, 1, 'Fito Paez', 'usuario4@ejemplo.com', 'Testuser4', '35874620', '1985-12-02');

INSERT INTO Usuarios (rol_idRol, estados_idEstados, nombre_completo, correo_electronico, password, telefono, fecha_nacimiento)
VALUES (1, 1, 'usuario5@ejemplo.com',  'Alejandro Sanz', 'Testuser5', '38395567', '1968-11-22');

/*insercion de categorias de los productos */

Select * from CategoriaProductos;

INSERT INTO CategoriaProductos (nombre, estados_idestados, idUsuario)
VALUES ('Audio', 1, 3);

INSERT INTO CategoriaProductos (nombre, estados_idestados, idUsuario)
VALUES ('Camaras', 1, 3);

INSERT INTO CategoriaProductos (nombre, estados_idestados, fecha_creacion, idUsuario)
VALUES ('Celulares', 1, '2024-08-07', 5);

INSERT INTO CategoriaProductos (nombre, estados_idestados, fecha_creacion, idUsuario)
VALUES ('Computadoras', 1, '2024-01-22', 5);

INSERT INTO CategoriaProductos (nombre, estados_idestados, fecha_creacion, idUsuario)
VALUES ('Televisores', 1, '2024-09-28', 3);

/* insercion de los productos */

select * from Productos;

INSERT INTO Productos (idCategoria, marca, modelo, codigo, stock, idEstado, precio, idUsuario)
VALUES (1, 'Airpod', 'IPX7', '1001', 2, 1, 245, 3);

INSERT INTO Productos (idCategoria, marca, modelo, codigo, stock, idEstado, precio, idUsuario)
VALUES (4, 'Dell', 'i3', '4001', 3, 1, 5999, 3);

INSERT INTO Productos (idCategoria, marca, modelo, codigo, stock, idEstado, precio, idUsuario)
VALUES (4, 'Teclado Logitech', 'K270', '4012', 5, 1, 179, 3);
GO


/*********************************** insercion de imagenes ****************************************/

EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
EXEC sp_configure 'Ad Hoc Distributed Queries', 1;
RECONFIGURE;
Select * from Productos;

INSERT INTO ImagenProducto (idProducto, imagen, Formato, idUsuario)
SELECT 
    1 AS idProducto, 
    BulkColumn AS imagen, 
    'image/jpeg' AS Formato,
    3 AS idUsuario
FROM OPENROWSET(BULK 'C:\Users\pivam\OneDrive\Escritorio\Desafio Web 360\Imagenes\Audio\Airpods IPX7.jpg', SINGLE_BLOB) AS Imagen;

INSERT INTO ImagenProducto (idProducto, imagen, Formato, idUsuario)
SELECT 
    7 AS idProducto, 
    BulkColumn AS imagen, 
    'image/jpeg' AS Formato,
    3 AS idUsuario
FROM OPENROWSET(BULK 'C:\Users\pivam\OneDrive\Escritorio\Desafio Web 360\Imagenes\Celulares\Samsung A15.jpg', SINGLE_BLOB) AS Imagen;

select * from Orden;

/************* insercion de ordenes forzando la fecha de Agosto para las vistas requeridas ******/


INSERT INTO Orden (
    usuarios_idusuarios, 
    estados_idEstadosOrdenes, 
    nombre_completo, 
    direccion, 
    telefono, 
    correo_electronico, 
    fecha_entrega, 
    total_orden,
    fecha_creacion
)
VALUES
(1, 1, 'Juan Perez Mayorista', 'Zona 1, Ciudad de Guatemala', '36857485', 'usuario@ejemplo.com', '2024-08-05', 0, '2024-08-01'),
(4, 1, 'Andres Calamaro', 'Zona 2, Ciudad de Guatemala', '37859485', 'usuario2@ejemplo.com', '2024-08-10', 0, '2024-08-02'),
(6, 1, 'Celia Cruz', 'Zona 3, Ciudad de Guatemala', '22286469', 'usuario3@ejemplo.com', '2024-08-15', 0, '2024-08-03'),
(7, 1, 'Fito Paez', 'Zona 4, Ciudad de Guatemala', '35874620', 'usuario4@ejemplo.com', '2024-08-18', 0, '2024-08-04'),
(8, 1, 'Alejandro Sanz', 'Zona 5, Ciudad de Guatemala', '38395567', 'usuario5@ejemplo.com', '2024-08-20', 0, '2024-08-05');


INSERT INTO OrdenDetalles (Orden_idOrden, Productos_idProductos, cantidad, precio)
VALUES
(10, 1, 2, 245), 
(11, 4, 1, 1999),
(11, 6, 1, 3999),
(11, 5, 2, 3995), 
(12, 2, 1, 5999), 
(13, 3, 3, 179), 
(13, 6, 1, 3999), 
(14, 5, 1, 3995), 
(14, 7, 2, 1499); 


UPDATE Orden
SET total_orden = (
    SELECT SUM(cantidad * precio)
    FROM OrdenDetalles
    WHERE Orden_idOrden = Orden.idOrden
)
WHERE fecha_creacion BETWEEN '2024-08-01' AND '2024-08-31';
