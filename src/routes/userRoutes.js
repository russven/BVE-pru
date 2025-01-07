const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Endpoint para obtener todos los usuarios
router.get('/', userController.getAllUsers);

// Endpoint para agregar un nuevo usuario
router.post('/', userController.createUser);

// Endpoint para eliminar un usuario por ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
