import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "@/config/index";
import { UnauthorizedError, ForbiddenError } from "@/errors/http.errors";
import { AuthenticatedRequest } from "@/types/index";

// Verifica que el usuario esté autenticado
export const authenticate = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies?.token;

  if (!token) {
    throw new UnauthorizedError("Token de autenticación no proporcionado");
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret as string) as {
      id: string;
      rol: string;
    };
    req.user = { id: decoded.id, rol: decoded.rol };
    next();
  } catch {
    throw new UnauthorizedError("Token inválido o expirado");
  }
};
