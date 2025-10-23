
import express from 'express';
import { PORT } from './config/env.js';

//Abajo importo las rutas que puse en la carpeta routes, no quise que éste quedara tan largo.
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import authRouter from './routes/auth.routes.js'


const app = express();
//Monto las rutas de autenticación bajo el prefijo /api/v1/auth, users y subscriptions repectivamente.
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)
app.use('/api/v1/auth', authRouter)

app.get('/', (req, res) => {
    res.send('Bienvenidos a mi API Tracker de Subscripciones');
});

app.listen(PORT, () => {
    console.log(` Subscription Tracker API runing on http://localhost:${PORT}`);
});

export default app;

//En este momento, intento correr la app por primera vez.
//Anda bien. 