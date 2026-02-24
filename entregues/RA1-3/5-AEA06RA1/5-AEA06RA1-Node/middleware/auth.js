import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config.js';

// Middleware per protegir rutes amb JWT
export function requireAuth(req, res, next) {
    try {
        // Intentem agafar el token de la cookie HTTP-only
        let token = req.cookies?.access_token;

        // Alternativament, acceptem també el header Authorization: Bearer <token>
        if (!token && req.headers.authorization) {
            const [type, value] = req.headers.authorization.split(' ');
            if (type === 'Bearer') token = value;
        }

        if (!token) {
            return res.status(401).json({ message: 'No s\'ha proporcionat cap token' });
        }

        const decoded = jwt.verify(token, SECRET_JWT_KEY);

        // Guardem l'usuari al request per fer-lo servir a les rutes
        req.user = { id: decoded.id, username: decoded.username };

        next();
    } catch (err) {
        console.error('❌ Error verificant token:', err.message);
        return res.status(401).json({ message: 'Token invàlid o expirat' });
    }
}

