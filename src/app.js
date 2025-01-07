require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('../db'); // Importar la conexión a la base de datos

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta de inicio
app.get('/', (req, res) => {
    res.send('¡Bienvenido a Bolsa de Valores del Entrenamiento (BVE)!');
});

// Rutas CRUD para usuarios

// Obtener todos los usuarios
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error al obtener los usuarios');
    }
});

// Agregar un nuevo usuario
app.post('/api/users', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error al agregar el usuario');
    }
});

// Actualizar un usuario existente
app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
            [name, email, password, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error al actualizar el usuario');
    }
});

// Eliminar un usuario
app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.status(200).send('Usuario eliminado correctamente');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error al eliminar el usuario');
    }
});

// Probar conexión con la base de datos
app.get('/api/db-status', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.status(200).send(`Conexión exitosa a la base de datos: ${result.rows[0].now}`);
    } catch (err) {
        console.error('Error al conectar con la base de datos:', err);
        res.status(500).send('Error al conectar con la base de datos');
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

