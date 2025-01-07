const pool = require('./db');

const createTable = async () => {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await pool.query(query);
        console.log('Tabla creada exitosamente');
    } catch (error) {
        console.error('Error al crear la tabla:', error);
    } finally {
        pool.end(); // Cierra la conexión
    }
};

createTable();
