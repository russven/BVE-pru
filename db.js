const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',         // Tu usuario de PostgreSQL
    host: 'localhost',        // Host donde está ejecutando PostgreSQL
    database: 'bve_db',       // Nombre de tu base de datos
    password: 'FCbarcelona10$',  // Contraseña del usuario
    port: 5432,               // Puerto por defecto de PostgreSQL
});



module.exports = pool;
