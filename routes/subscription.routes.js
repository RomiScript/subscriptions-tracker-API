/* eslint-disable no-undef */
import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => 
  res.send({ title: 'Obtener todas las suscripciones' })
);

subscriptionRouter.get('/:id', (req, res) => 
  res.send({ title: 'Obtener detalles de la suscripción' })
);

subscriptionRouter.post('/', authorize, (req, res) => 
  res.send({ title: 'Crear nueva suscripción' })
);

subscriptionRouter.put('/:id', (req, res) => 
  res.send({ title: 'Actualizar suscripción' })
);

subscriptionRouter.delete('/:id', (req, res) => 
  res.send({ title: 'Eliminar suscripción' })
);

subscriptionRouter.get('/user/:id', (req, res) => 
  res.send({ title: 'Obtener todas las suscripciones del usuario' })
);

subscriptionRouter.put('/:id/cancel', (req, res) => 
  res.send({ title: 'Cancelar suscripción' })
);

subscriptionRouter.get('/next-renewals', (req, res) => 
  res.send({ title: 'Obtener próximas renovaciones' })
);


export default subscriptionRouter;