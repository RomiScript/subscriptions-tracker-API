import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.end({title: 'Get all subscriptions'}))

export default subscriptionRouter;