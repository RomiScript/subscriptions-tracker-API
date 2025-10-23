import { Router } from 'express' ;

const authRouter = Router();

authRouter.post('/sign-up', (req, res) => res.send({title: 'Registro'}));
authRouter.post('/sign-in', (req, res) => res.send({title: 'Inicio de sesión'}));
authRouter.post('/sign-out', (req, res) => res.send({title: 'Cierre de sesión'}));

export default authRouter;