import mongoose from 'mongoose';

//estos son los controladores de autenticación.
export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
}

export const signIn = async (req, res, next) => {

}

export signOut = async (req, res, next) => {

}