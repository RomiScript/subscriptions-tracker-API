import { Router }  from "express";


const userRouter = Router();

//En esta sección puse los títulos en inglés para que quede clara mi comprensión del uso de los métodos HTTP, no es inconsistencia, todos estarán en inglés luego de la evaluación de mi trabajo antes de ir al portfolio.
userRouter.get('/', (req, res) => (res.send( {title: 'GET all users'}))); 

userRouter.get('/:id', (req, res) => (res.send( {title: 'GET user by ID'}))); 

userRouter.post('/', (req, res) => (res.send( {title: 'CREATE new user'}))); 

userRouter.put('/:id', (req, res) => (res.send( {title: 'UPDATE user by ID'})));

userRouter.delete('/:id', (req, res) => (res.send( {title: 'DELETE user by ID'})));  

export default userRouter;