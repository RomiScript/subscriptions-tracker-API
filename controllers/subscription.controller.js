import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
    try {
       
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });
        res.status(201).json({ succes: true, data: subscription})
    }
    catch (error) {
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        //compruebo que el usuario es el mismo que en el token
        if(req.user.id !== req.params.id) {
            const error = new Error('Esta cuenta no es tuya');
            error.status = 401;
            throw error;
        }
        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({ succes: true, data: subscriptions})
    }
    catch (error) {
        next(error);
    }
}
export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find().populate('user', 'name email');
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
}

export const getSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id).populate('user', 'name email');
        
        if (!subscription) {
            const error = new Error('Suscripción no encontrada');
            error.status = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
}

export const updateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('user', 'name email');
        
        if (!subscription) {
            const error = new Error('Suscripción no encontrada');
            error.status = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
}

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.id);
        
        if (!subscription) {
            const error = new Error('Suscripción no encontrada');
            error.status = 404;
            throw error;
        }

        res.status(200).json({ success: true, message: 'Suscripción eliminada correctamente' });
    } catch (error) {
        next(error);
    }
}