const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'Acceso denegado. No se encontró el token.' });
    }

    try {
        const verified = jwt.verify(token, 'miClaveSecreta123'); // Cambia a tu clave secreta
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }
};

module.exports = verifyToken;
