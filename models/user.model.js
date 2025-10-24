import mongoose from "mongoose";



const userSchema = new mongoose.Schema(
    {
        name: {
            type: String, required: [true, 'El nombre de usuario es obligatorio'],
            trim: true,
            minLength: 2,
            maxLength: 50,
        },
        email: {
            type: String, required: [true, 'El correo es obligatorio'],
            trim: true,
            unique: true,
            lowercase: true,
            //Acá uso una expresión regular para validar el formato del correo
            match: [/\S+@\S+\.\S+/, 'El correo no es válido'],
        },
        password: {
            type: String, required:[true, 'La contraseña es obligatoria'],
            minLength: 6,   
        }
    }, { timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;




