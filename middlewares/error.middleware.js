/* eslint-disable no-unused-labels */
// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
    try {
        let error= { ...err};

        error.message = err.message;

        console.error(err);

        if (err.name === 'CastError') {
            const message = 'Recurso no encontrado';

            error = new Error(message);
            error.statusCode = 404;
        }

    //Acá intentaré manejar error de clave duplicada en MongoDB (código 11000)
        if (err.code === 11000) {
            const message = 'Clave duplicada ingresada';
            error: new Error(message);
            error.statusCode = 400;
        }

    //Acá, errores de validación de Mongoose
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map((value) => value.message).join(', ');
            error = new Error(message);
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({
            succes: false,
            error: error.message || 'Error del servidor'
        })
    } catch (error) {
        next(error);
    }
}

export default errorMiddleware;