/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js'; 

// Estos son los controladores de autenticación.
// Se encargan de manejar el registro, inicio y cierre de sesión de los usuarios.

export const signUp = async (req, res, next) => {
  // Inicio una sesión de Mongoose para manejar la transacción
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Intentaré una lógica de registro de nuevo usuario
    const { name, email, password } = req.body;

    // Mi primera llamada a la base de datos con Mongoose:
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('El usuario ya existe');
      error.statusCode = 409; // conflicto
      throw error;
    }

    // Hasheo la contraseña antes de guardarla en la base de datos:
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creo un nuevo usuario dentro de la sesión activa:
    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    // Genero un token JWT para autenticar al usuario:
    const token = jwt.sign(
      { userId: newUsers[0]._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Confirmo la transacción y cierro la sesión:
    await session.commitTransaction();
    session.endSession();

    // Devuelvo una respuesta exitosa al cliente:
    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: {
        token,
        user: newUsers[0],
      },
    });

  } catch (error) {
    // Si algo falla, deshago la transacción y paso el error al middleware:
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};


// Controlador de inicio de sesión:
// Validará las credenciales y generará un token de acceso.
export const signIn = async (req, res, next) => {
 try {
    const { email, password} = req.body;
const user = await User.findOne({ email });
    if (!user) {
        const error = new Error('Usuario no encontrado');
        error.statusCode = 404;
        throw error;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        const error = new Error('Contraseña incorrecta');
        error.statusCode = 401;
        throw error;
    }
    const token = jwt.sign({ userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        data: {
            token,
            user
        }
    })

 } catch(error) {
  next(error);
 }
};


// Controlador de cierre de sesión:
// Podría manejar el borrado del token o la invalidación en el frontend.
export const signOut = async (req, res, next) => {
  // Próximamente implementaré la lógica de cierre de sesión.
};
