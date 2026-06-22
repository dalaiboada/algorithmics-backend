# Algorithmics API RESTful

Backend de la plataforma educativa Algorithmics. API RESTful desarrollada con Node.js, Express y TypeScript, con MongoDB como base de datos.

## Stack Tecnológico

| Tecnología     | Versión | Propósito                          |
| -------------- | ------- | ---------------------------------- |
| Node.js        | —       | Entorno de ejecución               |
| TypeScript     | 5.7.0   | Tipado estático y compilación      |
| Express        | 5.1.0   | Framework web HTTP                 |
| Mongoose       | 8.10.0  | ODM para MongoDB                   |
| MongoDB        | —       | Base de datos NoSQL                |

### Dependencias principales

| Paquete               | Versión  | Propósito                                  |
| --------------------- | -------- | ------------------------------------------ |
| bcrypt                | ^6.0.0   | Hashing y comparación de contraseñas       |
| jsonwebtoken          | ^9.0.3   | Autenticación stateless con JWT            |
| cookie-parser         | ^1.4.7   | Manejo de cookies httpOnly                 |
| class-validator       | ^0.15.1  | Validación de DTOs con decoradores         |
| speakeasy             | ^2.0.0   | Generación y verificación TOTP (2FA)       |
| qrcode                | ^1.5.4   | Generación de códigos QR para 2FA          |
| google-auth-library   | ^10.7.0  | Verificación de tokens de Google OAuth     |
| nodemailer            | ^8.0.11  | Envío de correos electrónicos              |
| dotenv                | ^16.4.7  | Carga de variables de entorno              |

## Características

- **Autenticación completa** — registro, inicio de sesión, cierre de sesión
- **JWT con refresh token** — access tokens de corta duración con rotación de refresh tokens
- **2FA (TOTP)** — autenticación de dos factores con Google Authenticator / Authy
- **Google OAuth** — inicio de sesión con cuenta de Google
- **Recuperación de contraseña** — flujo de olvido y restablecimiento por correo
- **RBAC con permisos** — control de acceso basado en roles con permisos granulares
- **Validación de entrada** — DTOs con class-validator en todas las rutas
- **Manejo de errores consistente** — errores HTTP tipados con mensajes en español
- **Arquitectura por capas** — Routes → Controllers → Services → Repositories

## Empezar

### Requisitos

- Node.js >= 18
- MongoDB (local o Atlas)
- Una cuenta de Gmail para envío de correos (opcional)
- Credenciales de Google OAuth (opcional)

### Instalación

```bash
git clone https://github.com/dalaiboada/algorithmics-backend.git
cd algorithmics-backend
npm install
```

### Configuración

Copiar el archivo de entorno y ajustar los valores:

```bash
cp .env.example .env
```

Variables de entorno disponibles:

| Variable                     | Por defecto                                    | Descripción                                |
| ---------------------------- | ---------------------------------------------- | ------------------------------------------ |
| `PORT`                       | `4000`                                         | Puerto del servidor                        |
| `MONGODB_URI`                | `mongodb://localhost:27017/algorithmics`        | Cadena de conexión a MongoDB               |
| `FRONTEND_URL`               | `http://localhost:5173`                         | Origen permitido por CORS                  |
| `JWT_SECRET`                 | `dev_secret_key`                               | Secreto HMAC para firmar JWTs              |
| `JWT_EXPIRATION`             | `24h`                                          | Duración del access token                  |
| `REFRESH_TOKEN_SECRET`       | `dev_refresh_secret`                           | Secreto para refresh tokens                |
| `REFRESH_TOKEN_EXPIRES_IN`   | `7d`                                           | Duración del refresh token                 |
| `SALT_ROUNDS`                | `10`                                           | Rondas de sal para bcrypt                  |
| `GMAIL_USER`                 | `""`                                           | Correo Gmail para nodemailer               |
| `GMAIL_APP_PASSWORD`         | `""`                                           | Contraseña de aplicación de Gmail          |
| `GOOGLE_CLIENT_ID`           | `""`                                           | Client ID de Google OAuth                  |
| `GOOGLE_CLIENT_SECRET`       | `""`                                           | Client Secret de Google OAuth              |
| `GOOGLE_REDIRECT_URI`        | `""`                                           | URI de redirección de Google OAuth         |

### Ejecución

```bash
# Desarrollo con hot-reload
npm run dev

# Compilar a JavaScript
npm run build

# Producción
npm start

# Verificar tipos
npm run lint
```

## Estructura del proyecto

```
src/
├── app.ts                     # Configuración de Express (middlewares, rutas)
├── server.ts                  # Punto de entrada (conexión BD + inicio)
├── config/
│   ├── index.ts               # Variables de entorno centralizadas
│   └── database.ts            # Conexión a MongoDB
├── controllers/               # Manejadores de peticiones HTTP
│   ├── auth.controller.ts     #   Registro, login, 2FA, Google OAuth
│   ├── test.controller.ts     #   Health check
│   └── user.controller.ts     #   CRUD de usuarios (admin)
├── dtos/                      # DTOs con validación (class-validator)
│   ├── create-user.dto.ts
│   ├── login.dto.ts
│   ├── login-2fa.dto.ts
│   ├── forgot-password.dto.ts
│   ├── reset-password.dto.ts
│   └── verify-setup-2fa.dto.ts
├── errors/                    # Clases de error HTTP tipadas
│   ├── custom.error.ts
│   └── http.errors.ts         # BadRequest, Unauthorized, Forbidden, NotFound
├── interfaces/                # Interfaces TypeScript
│   ├── auth.interface.ts
│   ├── refresh-token.interface.ts
│   ├── role.interface.ts
│   └── user.interface.ts
├── middlewares/
│   ├── auth.middleware.ts      # authenticate + permit (permisos)
│   ├── error.middleware.ts     # Manejador global de errores
│   └── validation.middleware.ts # Validación de DTOs
├── models/                    # Esquemas de Mongoose
│   ├── refresh-token.model.ts
│   ├── role.model.ts
│   └── user.model.ts
├── repositories/              # Capa de acceso a datos
│   └── user.repository.ts
├── routes/                    # Definición de rutas
│   ├── index.ts               #   Router principal (/api/v1)
│   └── v1/
│       ├── auth.routes.ts
│       ├── test.routes.ts
│       └── user.routes.ts
├── seeds/                     # Población inicial de datos
│   └── role.seed.ts           #   Roles por defecto
├── services/                  # Lógica de negocio
│   ├── auth.service.ts
│   ├── email.service.ts
│   ├── test.service.ts
│   └── user.service.ts
├── templates/                 # Plantillas HTML para correos
│   ├── reset-password-email.ts
│   └── welcome-email.ts
└── types/                     # Tipos compartidos
    └── index.ts               # AsyncHandler, AuthenticatedRequest
```

## Endpoints de la API

Base URL: `http://localhost:4000/api/v1`

### Autenticación (`/auth`)

| Método | Ruta                    | Autenticación | Descripción                                    |
| ------ | ----------------------- | ------------- | ---------------------------------------------- |
| POST   | `/auth/register`        | —             | Registrar nuevo usuario (rol: Estudiante)       |
| POST   | `/auth/login`           | —             | Iniciar sesión con email y contraseña           |
| POST   | `/auth/login/2fa`       | —             | Segundo paso de login con 2FA                   |
| POST   | `/auth/google`          | —             | Iniciar sesión con Google OAuth                 |
| POST   | `/auth/logout`          | Cookie        | Cerrar sesión                                   |
| POST   | `/auth/logout-all`      | `authenticate`| Cerrar sesión en todos los dispositivos         |
| POST   | `/auth/refresh`         | Cookie        | Renovar access token                            |
| POST   | `/auth/forgot-password` | —             | Solicitar restablecimiento de contraseña        |
| POST   | `/auth/reset-password`  | —             | Restablecer contraseña con token                |
| POST   | `/auth/2fa/setup`       | `authenticate`| Configurar 2FA (generar secreto + QR)           |
| POST   | `/auth/2fa/verify-setup`| `authenticate`| Verificar código 2FA y activar                  |

### Usuarios (`/user`)

| Método | Ruta  | Autenticación          | Permiso requerido | Descripción                          |
| ------ | ----- | ---------------------- | ----------------- | ------------------------------------ |
| POST   | `/user`| `authenticate` + `permit("user:create")` | — | Crear usuario (admin) |

### Health Check

| Método | Ruta  | Autenticación | Descripción               |
| ------ | ----- | ------------- | ------------------------- |
| GET    | `/`   | —             | Estado del servidor       |
| GET    | `/api/v1/test` | —      | Health check con timestamp |

## Sistema de Permisos

La API implementa un sistema RBAC con permisos almacenados en MongoDB.

### Roles por defecto

| Rol            | Permisos                                                                 |
| -------------- | ------------------------------------------------------------------------ |
| Administrador  | `*` (acceso total)                                                       |
| Instructor     | `user:read`, `user:list`, `course:*`, `report:read`, `report:create`     |
| Estudiante     | `course:read`, `course:list`, `user:read`, `user:update`                 |

### Formato de permisos

```
{recurso}:{accion}
```

Soporta comodines: `user:*`, `course:*`, `*`

### Uso en rutas

```typescript
import { authenticate, permit } from "@/middlewares/auth.middleware";

router.get("/", authenticate, permit("course:list"), controller.list);
router.delete("/:id", authenticate, permit("course:delete"), controller.remove);
```

Los permisos se cargan desde la base de datos en cada request autenticado. Los cambios en la colección `roles` se reflejan en vivo sin necesidad de reiniciar el servidor.

## Seguridad

- Contraseñas hasheadas con **bcrypt** (salt rounds configurables)
- JWT transportado en **cookie httpOnly** con `sameSite: "strict"`
- **Refresh token rotation**: el token anterior se invalida al renovar
- **Revocación** de tokens por sesión o global
- **2FA con TOTP** (Google Authenticator, Authy)
- **CORS** con lista blanca de orígenes
- **Validación de entrada** en todas las rutas con DTOs
- Mensajes de error genéricos para evitar enumeración de usuarios

## Documentación

La documentación detallada se encuentra en el directorio `docs/`:

| Documento                        | Descripción                                        |
| -------------------------------- | -------------------------------------------------- |
| `docs/architecture.md`           | Arquitectura del sistema y flujo de datos          |
| `docs/autenticacion.md`          | Autenticación completa (register, login, JWT, 2FA) |
| `docs/frontend-integration.md`   | Guía de integración para el frontend               |
| `docs/usuarios.md`               | Creación de usuarios por administrador             |
| `docs/permisos.md`               | Sistema de permisos RBAC                           |
| `docs/code-review.md`            | Code review profesional del proyecto               |

## Scripts disponibles

| Comando           | Descripción                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Inicia el servidor en desarrollo con hot-reload |
| `npm run build`   | Compila TypeScript a `dist/`                   |
| `npm start`       | Ejecuta la compilación en producción           |
| `npm run lint`    | Verifica tipos con `tsc --noEmit`              |

## Licencia

MIT
