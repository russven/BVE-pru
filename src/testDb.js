const pool = require('../db'); // Importa la conexión a la base de datos

const testConnection = async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Conexión exitosa:', result.rows[0]);
        pool.end(); // Cierra la conexión después de la prueba
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
};

testConnection();
