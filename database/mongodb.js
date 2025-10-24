import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
    throw new Error("Por favor, definir la variable de entorno MONGODB_URI en el archivo .env.<development/product>.local");
}

const connectToDataBase = async () => {
    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000 // 30 segundos
        });

        console.log(`✅ Conectado a la base de datos en entorno ${NODE_ENV}`);
    } catch (error) {
        console.error("❌ Error conectando a la base de datos:", error.message);
        process.exit(1); // cierra el server si no puede conectar
    }
};

export default connectToDataBase;
