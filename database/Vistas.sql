/*-------------------------------------creacion Vista Productos activos con stock---------------------------------*/

CREATE VIEW ProductosActivosConStock AS
select
    count(*) as TotalProductosActivos
FROM
    Productos
WHERE
    idEstado = 1
    and stock > 0;
Go

Select * from ProductosActivosConStock;
GO
/*-------------------------------------creacion Vista TotalQuetzales Agosto 2024---------------------------------*/

CREATE VIEW TotalQuetzalesAgosto2024 AS
select
    SUM(total_orden) AS TotalQuetzales
FROM Orden
WHERE fecha_creacion BETWEEN '2024-08-01' AND '2024-08-31';
GO

Select * from TotalQuetzalesAgosto2024;
GO
/************************** Top 10 Clientes Mayor Consumo *****************************************************/

CREATE VIEW Top10ClientesMayorConsumo AS
SELECT 
    U.idUsuario,
    U.nombre_completo,
    U.correo_electronico,
    SUM(O.total_orden) AS ConsumoTotal
FROM 
    Orden O
INNER JOIN 
    Usuarios U ON O.usuarios_idusuarios = U.idUsuario
GROUP BY 
    U.idUsuario, U.nombre_completo, U.correo_electronico
ORDER BY 
    ConsumoTotal DESC
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;
GO

Select * from Top10ClientesMayorConsumo;
GO

/************************************* Top 10 de Productos mas vendidos en orden ascendente **************************/

CREATE VIEW Top10ProductosMasVendidos AS
SELECT 
    P.idProducto,
    P.marca,
    P.modelo,
    SUM(OD.cantidad) AS TotalVendidos
FROM 
    OrdenDetalles OD
INNER JOIN 
    Productos P ON OD.Productos_idProductos = P.idProducto
GROUP BY 
    P.idProducto, P.marca, P.modelo
ORDER BY 
    TotalVendidos ASC
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;
GO

Select * from Top10ProductosMasVendidos;
GO