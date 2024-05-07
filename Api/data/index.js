import mysql from 'mysql2/promise';

const pool = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'empresas_mineradoras',
    password: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 10
});

export default pool;