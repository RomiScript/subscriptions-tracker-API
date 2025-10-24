import authorize from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { 
  getAllSubscriptions, 
  getSubscription, 
  createSubscription, 
  updateSubscription, 
  deleteSubscription, 
  getUserSubscriptions 
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();


subscriptionRouter.get('/', getAllSubscriptions);

subscriptionRouter.get('/:id', authorize, getSubscription);
subscriptionRouter.post('/', authorize, createSubscription);
subscriptionRouter.put('/:id', authorize, updateSubscription);
subscriptionRouter.delete('/:id', authorize, deleteSubscription);
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);


subscriptionRouter.put('/:id/cancel', authorize, updateSubscription);


subscriptionRouter.get('/next-renewals', authorize, (req, res) => 
  res.status(501).json({ 
    success: false, 
    message: 'Endpoint en desarrollo - Próximas renovaciones' 
  })
);

export default subscriptionRouter;