import mongoose from "mongoose";


//eslint-disable-next-line no-unused-vars
const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String, required: [true, 'El nombre es obligatorio'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number, required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo'],
        
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'NZD',
        'SEK', 'KRW', 'SGD', 'NOK', 'MXN', 'INR', 'RUB', 'ZAR', 'BRL', 'ARS',
        "CLP", "COP", "PEN", "UYU", "BOB", "PYG"],
        default: "USD"
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['Sports',
  'News',
  'Entertainment',
  'Movies',
  'Series',
  'Music',
  'Documentary',
  'Lifestyle',
  'Technology',
  'Gaming',
  'Education',
  'Kids',
  'Travel',
  'Food',
  'Health',
  'Science',
  'Business',
  'Politics',
  'Culture',
  'History',
  'Fashion',
  'Art',
  'Comedy',
  'Drama',
  'Action',
  'Horror',
  'Romance',
  'Mystery',
  'Reality',
  'Talk Shows'],
  required: true,
  
    },
    paymentMethod: {
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['actuve', 'cancelled', 'expired'],
        default: 'active',
    },
    startDate: {
  type: Date,
  required: true,
  validate: {
    validator: function (value) {
      return value <= new Date();
    },
    message: 'La fecha de inicio debe ser actual o anterior',
  },
},

renewalDate: {
  type: Date,
  validate: {
    validator: function (value) {
      return value > this.startDate;
    },
    message: 'La fecha de renovación debe ser posterior a la fecha de inicio',
  },
},
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
}
}, { timestamps: true});

// Antes de guardar una suscripción, verifico si el campo `renewalDate` no fue provisto.
// En ese caso, calculo automáticamente la fecha de renovación en función de la frecuencia elegida.
// Defino un objeto `renewalPeriods` que representa los distintos intervalos posibles
// (diario, semanal, mensual y anual) expresados en cantidad de días.
// Luego, parto desde la fecha de inicio (`startDate`) y le sumo la cantidad de días
// correspondiente a la frecuencia seleccionada. De esta forma, el sistema completa
// automáticamente la próxima fecha de renovación, garantizando coherencia entre los datos.
// eslint-disable-next-line no-unused-vars
subscriptionSchema.pre('save', function (next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,

        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    //Actualizo el estado de la subscripción si la fecha de renovación ya pasó.
    if(this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    next();
});

const subscription = mongoose.model('Subscription', subscriptionSchema);

export default subscription;