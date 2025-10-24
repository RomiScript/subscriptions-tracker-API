
import mongoose from "mongoose";

import { DB_URI, NODE_ENV } from "../config/env.js";

if(!DB_URI){
    throw new Error("Por favor, definir la variable de entorno MONGODB_URI en el archivo .env.<development/product>.local");
}

const connectToDataBase = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log(`Conectado a la base de datos en entorno ${NODE_ENV}`)
    } catch (error) {
        console.error("Error conectando a la base de datos: ", error);
        
        process.exit(1);
    }
}
export default connectToDataBase;