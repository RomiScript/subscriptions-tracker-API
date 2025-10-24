import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        minLength: [2, 'El nombre debe tener al menos 2 caracteres'],
        maxLength: [100, 'El nombre no puede exceder los 100 caracteres'],
    },
    price: {
        type: Number, 
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo'],
    },
    currency: {
        type: String,
        enum: {
            values: ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'NZD',
                    'SEK', 'KRW', 'SGD', 'NOK', 'MXN', 'INR', 'RUB', 'ZAR', 'BRL', 'ARS',
                    "CLP", "COP", "PEN", "UYU", "BOB", "PYG"],
            message: 'Moneda no válida'
        },
        default: "USD"
    },
    frequency: {
        type: String,
        enum: {
            values: ['daily', 'weekly', 'monthly', 'yearly'],
            message: 'Frecuencia no válida'
        },
        required: [true, 'La frecuencia es obligatoria']
    },
    category: {
        type: String,
        enum: {
            values: [
                'Sports', 'News', 'Entertainment', 'Movies', 'Series', 'Music', 
                'Documentary', 'Lifestyle', 'Technology', 'Gaming', 'Education', 
                'Kids', 'Travel', 'Food', 'Health', 'Science', 'Business', 
                'Politics', 'Culture', 'History', 'Fashion', 'Art', 'Comedy', 
                'Drama', 'Action', 'Horror', 'Romance', 'Mystery', 'Reality', 
                'Talk Shows'
            ],
            message: 'Categoría no válida'
        },
        required: [true, 'La categoría es obligatoria'],
    },
    paymentMethod: {
        type: String,
        required: [true, 'El método de pago es obligatorio'],
        trim: true,
        maxLength: [50, 'El método de pago no puede exceder los 50 caracteres']
    },
    status: {
        type: String,
        enum: {
            values: ['active', 'cancelled', 'expired'],
            message: 'Estado no válido'
        },
        default: 'active',
    },
    startDate: {
        type: Date,
        required: [true, 'La fecha de inicio es obligatoria'],
        validate: {
            validator: function(value) {
                return value <= new Date();
            },
            message: 'La fecha de inicio debe ser actual o anterior',
        },
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function(value) {
                if (!value) return true; // Es opcional
                return value > this.startDate;
            },
            message: 'La fecha de renovación debe ser posterior a la fecha de inicio',
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es obligatorio'],
        index: true,
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'La descripción no puede exceder los 500 caracteres']
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true } // Para incluir campos virtuales en JSON
});

// Campo virtual para días hasta la renovación
subscriptionSchema.virtual('daysUntilRenewal').get(function() {
    if (!this.renewalDate) return null;
    const today = new Date();
    const diffTime = this.renewalDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
});

// Índices para mejor performance
subscriptionSchema.index({ user: 1, status: 1 });
subscriptionSchema.index({ renewalDate: 1 });
subscriptionSchema.index({ category: 1 });

// Middleware para calcular renewalDate automáticamente
subscriptionSchema.pre('save', function(next) {
    if (!this.renewalDate && this.startDate && this.frequency) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    
    // Actualizar estado si la fecha de renovación ya pasó
    if (this.renewalDate && this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    
    next();
});

// Método estático para buscar suscripciones activas
subscriptionSchema.statics.findActive = function() {
    return this.find({ status: 'active' });
};

// Método de instancia para cancelar suscripción
subscriptionSchema.methods.cancel = function() {
    this.status = 'cancelled';
    return this.save();
};

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;