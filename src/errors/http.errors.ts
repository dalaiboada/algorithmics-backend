import { CustomError } from "@/errors/custom.error";

// Petición Incorrecta (Ej: Datos de DTO inválidos)
export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(message: string = "Petición incorrecta") {
    super(message);
  }
}

// No Autorizado (Ej: Contraseña incorrecta en el login)
export class UnauthorizedError extends CustomError {
  statusCode = 401;
  constructor(message: string = "No autorizado") {
    super(message);
  }
}

// No Encontrado (Ej: El usuario no existe en la BD)
export class NotFoundError extends CustomError {
  statusCode = 404;
  constructor(message: string = "Recurso no encontrado") {
    super(message);
  }
}

// Prohibido (Ej: El usuario no tiene el rol de Administrador)
export class ForbiddenError extends CustomError {
  statusCode = 403;
  constructor(message: string = "Acceso prohibido") {
    super(message);
  }
}
