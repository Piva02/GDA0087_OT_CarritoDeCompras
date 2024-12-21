create database GDA0087_OT_ClaudiaPivaral;
Go
use GDA0087_OT_ClaudiaPivaral;
Go
create table Clientes (
    idClientes INT Identity (1, 1) primary key,
    razon_social varchar (245) not null,
    nombre_comercial varchar (45) not null,
    direccion_entrega varchar(45) not null,
    telefono varchar(45) not null,
    email varchar(45) not null
);

create table Estados (
    idEstados INT IDENTITY (1, 1) Primary key,
    nombre varchar(45) not null
);

create table EstadosOrdenes (
    idEstadosOrdenes INT Identity (1, 1) primary key,
    nombre varchar(45) not null
);

create table rol (
    idRol int identity (1,1) primary key,
    nombre varchar(45) not null
);

create table Usuarios (
    idUsuario INT Identity (1, 1) primary key,
    rol_idRol int not null,
    estados_idEstados int not null,
    idClientes int null,
    nombre_completo varchar (100) not null,
    correo_electronico varchar (100) unique not null,
    password varchar(45) not null,
    telefono varchar(45),
    fecha_nacimiento date not null,
    fecha_creacion datetime default getdate(),
    FOREIGN key (rol_idRol) references Rol(idRol),
    FOREIGN KEY (estados_idEstados) REFERENCES Estados(idEstados),
    FOREIGN KEY (idClientes) REFERENCES Clientes(idClientes)
);

create table CategoriaProductos (
    idCategoriaProductos INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    estados_idestados INT NOT NULL,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    idUsuario int not null,
    FOREIGN KEY (estados_idestados) REFERENCES Estados(idEstados),
    Foreign key (idUsuario) references Usuarios (idUsuario)
);

create table Productos (
    idProducto INT Identity(1,1) primary key,
    idCategoria INT not null,
    marca varchar(45) not null,
    modelo varchar(45),
    codigo varchar(45) not null,
    stock float,
    idEstado INT not null,
    precio Float not null,
    fecha_creacion DATETIME default GetDate(),
    idUsuario int not null,
    foreign KEY (idCategoria) references CategoriaProductos(idCategoriaProductos),
    foreign key (idEstado) references Estados (idEstados),
    foreign key (idUsuario) references Usuarios(idUsuario)
);

/* He creado una tabla adicional para las imagenes pensando en que si la tienda crece y alguien quiere hacer un query sobre los productos
para saturar el request con la data de las imagenes, sugiero tenerlas separadas pero relacionadas con su respectivo producto */
create table ImagenProducto (
    idImagenProducto int identity (1, 1) primary key,
    idProducto int not null,
    imagen Varbinary(max) not null,
    Formato nvarchar (50) not null,
    idUsuario int not null,
    fecha_modificacion datetime default getdate(),
    foreign key (idProducto) references Productos (idProducto),
    foreign key (idUsuario) references Usuarios (idUsuario)
);

CREATE TABLE Orden (
    idOrden INT IDENTITY(1,1) PRIMARY KEY,
    usuarios_idusuarios INT NOT NULL,
    estados_idEstadosOrdenes INT NOT NULL,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    nombre_completo VARCHAR(100) NOT NULL,
    direccion VARCHAR(245) NOT NULL,
    telefono VARCHAR(45) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL,
    fecha_entrega DATE,
    total_orden FLOAT,
    FOREIGN KEY (usuarios_idusuarios) REFERENCES Usuarios(idUsuario),
    FOREIGN KEY (estados_idEstadosOrdenes) REFERENCES EstadosOrdenes (idEstadosOrdenes)
);


CREATE TABLE OrdenDetalles (
    idOrdenDetalles INT IDENTITY(1,1) PRIMARY KEY,
    Orden_idOrden INT NOT NULL,
    Productos_idProductos INT NOT NULL,
    cantidad INT NOT NULL,
    precio FLOAT NOT NULL,
    subtotal AS (cantidad * precio) PERSISTED,
    FOREIGN KEY (Orden_idOrden) REFERENCES Orden(idOrden),
    FOREIGN KEY (Productos_idProductos) REFERENCES Productos(idProducto)
);
