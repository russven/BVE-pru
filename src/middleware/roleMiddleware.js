const verifyRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Acceso denegado. No tienes los permisos necesarios.' });
        }
        next();
    };
};

module.exports = verifyRole;
