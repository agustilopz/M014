// middleware/auth.js
export function requireAuth(req, res, next) {
        console.log('👤 req.session.user =', req.session.user);

    if (!req.session || !req.session.user)  {
        // Si no hi ha usuari loguejat, retornem error o redirigim al login
        return res.status(403).render('error_access', {
            message: 'Cal iniciar sessió per accedir a aquesta secció.'
        });
    }
    next(); // Si hi ha usuari, continua amb la següent funció o ruta
}
