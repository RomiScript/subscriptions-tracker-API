import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1});

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: 'Demasiadas solicitudes' });
      }

      if (decision.reason.isBot()) {
        return res.status(403).json({ error: '¡No se permiten bots!' });
      }

      return res.status(403).json({ error: 'Acceso denegado' });
    }

    //Si no fue denegado, seguir con la ruta
    next();

  } catch (error) {
    console.error(`Arcjet middleware error: ${error}`);
    next(error); // pasa el error al manejador global
  }
};

export default arcjetMiddleware;
