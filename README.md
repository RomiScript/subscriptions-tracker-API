Subscription Tracker API
Una API RESTful desarrollada con Express.js y MongoDB para el seguimiento y gestión de suscripciones. Este proyecto fue desarrollado como parte de la formación en Node.js de la diplomatura full-stack de la UTN, implementando operaciones CRUD completas con autenticación JWT.

📋 Descripción del Proyecto:
Esta API permite a los usuarios gestionar sus suscripciones a diversos servicios, realizar un seguimiento de fechas de renovación, costos y categorías. Casi abandoné el proyecto en varias ocasiones debido a la complejidad que me autoimpuse al intentar optimizar cada detalle, pero finalmente logré completarlo con una arquitectura sólida y organizada.

Nota importante: Este proyecto parte del código base proporcionado por el profesor Gabriel Alberini
Toda su instrucción durante las clases fueron invaluables para mi entendimiento en la materia.
🛠 Tecnologías Utilizadas
Backend: Node.js + Express.js

Base de datos: MongoDB + Mongoose

Autenticación: JWT (JSON Web Tokens)

Seguridad: Bcrypt para hashing de contraseñas

Validación: Mongoose validation

Testing: HTTPie (preferido sobre Postman por su simplicidad en terminal)

🗂 Estructura del Proyecto:

EXPLORER:

TRACKER-UTN-NODEjS/
├── config/
│   ├── env.js
│   └── arcjet.js
├── controllers/
│   ├── auth.controller.js
│   ├── subscription.controller.js
│   └── user.controller.js
├── database/
│   └── mongodb.js
├── middlewares/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── arcjet.middleware.js
├── models/
│   ├── subscription.model.js
│   └── user.model.js
├── routes/
│   ├── auth.routes.js
│   ├── subscription.routes.js
│   └── user.routes.js
├── .env.development.local
├── .env.production.local
├── app.js
└── package.json

Prerrequisitos:
Node.js (v16 o superior)

MongoDB (local o Atlas)

HTTPie (para testing)




🔐 Modelo de Seguridad
Endpoints públicos: Solo operaciones de lectura (GET) en listados generales

Endpoints protegidos: Todas las operaciones de escritura (POST, PUT, DELETE) requieren token JWT

Contraseñas: Hasheadas con bcrypt antes de almacenar

Tokens JWT: Configurados con expiración y verificación de validez


🎯 Características Implementadas:

Operaciones CRUD completas para usuarios y suscripciones

Autenticación JWT robusta

Validación de datos con Mongoose

Manejo centralizado de errores

Estructura modular y escalable

Seguridad en contraseñas y tokens

Cálculo automático de fechas de renovación

Categorización de suscripciones

Soporte para múltiples monedas

🔄 Flujo de Trabajo:

Registro/Login → Obtener token JWT

Operaciones públicas → Listar usuarios/suscripciones (sin token)

Operaciones protegidas → Crear, actualizar, eliminar (con token)

Gestión completa → Seguimiento de suscripciones personales

📝 Notas de Desarrollo:

Este proyecto representó mi primera incursión seria en el desarrollo backend. Las principales dificultades encontradas y superadas fueron:

Organización de la arquitectura de carpetas

Implementación correcta de JWT y middlewares

Manejo de transacciones con Mongoose

Validaciones complejas en los modelos

Cálculo automático de fechas de renovación

El uso de HTTPie resultó más eficiente que Postman para testing rápido en terminal, permitiendo una iteración más ágil durante el desarrollo.

👨‍💻 Autor: Romi Martínez
Desarrollado como proyecto académico, demostrando la implementación de una API RESTful completa con Express.js y MongoDB, partiendo de una base proporcionada pero evolucionando hacia una arquitectura propia y organizada.

Estado del proyecto: Completado y funcional
Última actualización: Octubre 2025

