require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Importar las rutas de usuarios

const app = express();

// Middleware
app.use(cors()); // Permitir solicitudes desde otros dominios
app.use(express.json()); // Procesar solicitudes con cuerpo en formato JSON

// Ruta de inicio
app.get('/', (req, res) => {
    res.send('¡Bienvenido a Bolsa de Valores del Entrenamiento (BVE)!');
});

// Rutas de usuarios
app.use('/api/users', userRoutes); // Prefijo para todas las rutas de usuarios

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
