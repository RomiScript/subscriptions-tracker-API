import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: [true, 'El nombre de usuario es obligatorio'],
            trim: true,
            minLength: [2, 'El nombre debe tener al menos 2 caracteres'],
            maxLength: [50, 'El nombre no puede exceder los 50 caracteres'],
        },
        email: {
            type: String, 
            required: [true, 'El correo es obligatorio'],
            trim: true,
            unique: true,
            lowercase: true,
            index: true, // Lo pongo para que las búsquedas rindan mejor
            match: [/\S+@\S+\.\S+/, 'Por favor ingresa un correo válido'],
        },
        password: {
            type: String, 
            required: [true, 'La contraseña es obligatoria'],
            minLength: [6, 'La contraseña debe tener al menos 6 caracteres'],   
            select: false // No la incluyo en las queries por defecto
        }
    }, 
    { 
        timestamps: true,
        toJSON: {
            transform: function(doc, ret) {
                // Borro la password cuando convierto a JSON
                delete ret.password;
                return ret;
            }
        }
    }
);

// Middleware: la hasheo antes de guardarla
userSchema.pre('save', async function(next) {
    // Solo la hasheo si fue modificada (o si es nueva)
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Método para comparar passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Método para devolver el usuario sin la password
userSchema.methods.toSafeObject = function() {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

const User = mongoose.model('User', userSchema);

export default User;


