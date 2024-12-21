import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({massage: 'Acceso denegado. Token no proporcionado'});

    try {
        const verified = jwt.verify(token, 'yourSecretKey');
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({massage: 'Token invalido'});
    }
};