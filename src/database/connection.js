import sql from 'mssql'

const dbSettings = {
    user: "sa",
    password: "P1v1t@2024@",
    server: "localhost",
    database: "GDA0087_OT_ClaudiaPivaral",
    options: {
        encrypt: false, 
        trustServerCertificate: true,
    },
};

export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.error('Error en la conexión a la base de datos:', error);
    }
};
