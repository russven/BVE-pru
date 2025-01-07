let users = []; // Base de datos temporal

// Obtener todos los usuarios
const getAllUsers = (req, res) => {
    res.json(users);
};

// Crear un nuevo usuario
const createUser = (req, res) => {
    const { name, email } = req.body;

    // Validar datos básicos
    if (!name || !email) {
        return res.status(400).json({ error: 'Nombre y correo son obligatorios' });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email,
    };

    users.push(newUser);
    res.status(201).json(newUser);
};

// Eliminar un usuario por ID
const deleteUser = (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex((user) => user.id == id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    users.splice(userIndex, 1);
    res.json({ message: 'Usuario eliminado' });
};

module.exports = { getAllUsers, createUser, deleteUser };
