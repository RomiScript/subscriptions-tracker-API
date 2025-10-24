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

EXPLORER
TRACKER-UTN-NODELS/
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
🚀 Instalación y Configuración
Prerrequisitos
Node.js (v16 o superior)

MongoDB (local o Atlas)

HTTPie (para testing)




📚 Documentación de la API
Autenticación
Registrar usuario
http
POST /api/v1/auth/sign-up
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123"
}
Iniciar sesión
http
POST /api/v1/auth/sign-in
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "password123"
}
Usuarios (Público y Protegido)
Listar todos los usuarios (Público)
http
GET /api/v1/users
Obtener usuario específico (Protegido)
http
GET /api/v1/users/:id
Authorization: Bearer <token_jwt>
Actualizar usuario (Protegido)
http
PUT /api/v1/users/:id
Authorization: Bearer <token_jwt>
Content-Type: application/json

{
  "name": "Juan Carlos Pérez"
}
Eliminar usuario (Protegido)
http
DELETE /api/v1/users/:id
Authorization: Bearer <token_jwt>
Suscripciones (Público y Protegido)
Listar todas las suscripciones (Público)
http
GET /api/v1/subscriptions
Crear suscripción (Protegido)
http
POST /api/v1/subscriptions
Authorization: Bearer <token_jwt>
Content-Type: application/json

{
  "name": "Netflix Premium",
  "price": 15.99,
  "currency": "USD",
  "frequency": "monthly",
  "category": "Entertainment",
  "paymentMethod": "Visa ****1234",
  "startDate": "2024-01-01"
}
Obtener suscripción específica (Protegido)
http
GET /api/v1/subscriptions/:id
Authorization: Bearer <token_jwt>
Actualizar suscripción (Protegido)
http
PUT /api/v1/subscriptions/:id
Authorization: Bearer <token_jwt>
Content-Type: application/json

{
  "price": 17.99
}
Eliminar suscripción (Protegido)
http
DELETE /api/v1/subscriptions/:id
Authorization: Bearer <token_jwt>
Obtener suscripciones de usuario (Protegido)
http
GET /api/v1/subscriptions/user/:userId
Authorization: Bearer <token_jwt>
🔐 Modelo de Seguridad
Endpoints públicos: Solo operaciones de lectura (GET) en listados generales

Endpoints protegidos: Todas las operaciones de escritura (POST, PUT, DELETE) requieren token JWT

Contraseñas: Hasheadas con bcrypt antes de almacenar

Tokens JWT: Configurados con expiración y verificación de validez

💾 Modelos de Datos
Usuario
javascript
{
  name: String (requerido, 2-50 caracteres),
  email: String (requerido, único, válido),
  password: String (requerido, min 6 caracteres, hasheada)
}
Suscripción
javascript
{
  name: String (requerido, 2-100 caracteres),
  price: Number (requerido, mínimo 0),
  currency: String (enum, default "USD"),
  frequency: String (enum: daily, weekly, monthly, yearly),
  category: String (enum: Sports, News, Entertainment, etc.),
  paymentMethod: String (requerido),
  status: String (enum: active, cancelled, expired),
  startDate: Date (requerido),
  renewalDate: Date (calculado automáticamente),
  user: ObjectId (referencia a User)
}
🧪 Testing con HTTPie
Ejemplos de comandos para testing:
bash
# Registro de usuario
http POST http://localhost:3000/api/v1/auth/sign-up name="Maria Garcia" email="maria@example.com" password="password123"

# Login
http POST http://localhost:3000/api/v1/auth/sign-in email="maria@example.com" password="password123"

# Listar suscripciones (público)
http GET http://localhost:3000/api/v1/subscriptions

# Crear suscripción (protegido)
http POST http://localhost:3000/api/v1/subscriptions Authorization:"Bearer <token>" name="Spotify Premium" price=9.99 frequency="monthly" category="Music" paymentMethod="Mastercard" startDate="2024-01-01"
🎯 Características Implementadas
Operaciones CRUD completas para usuarios y suscripciones

Autenticación JWT robusta

Validación de datos con Mongoose

Manejo centralizado de errores

Estructura modular y escalable

Seguridad en contraseñas y tokens

Cálculo automático de fechas de renovación

Categorización de suscripciones

Soporte para múltiples monedas

🔄 Flujo de Trabajo
Registro/Login → Obtener token JWT

Operaciones públicas → Listar usuarios/suscripciones (sin token)

Operaciones protegidas → Crear, actualizar, eliminar (con token)

Gestión completa → Seguimiento de suscripciones personales

📝 Notas de Desarrollo
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
Última actualización: Octubre 2024

