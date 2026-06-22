import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "@/config/index";
import { UnauthorizedError, ForbiddenError } from "@/errors/http.errors";
import { AuthenticatedRequest } from "@/types/index";
import { RoleModel } from "@/models/role.model";

// Verifica que el usuario esté autenticado y carga sus permisos
export const authenticate = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = req.cookies?.token;

  if (!token) {
    throw new UnauthorizedError("Token de autenticación no proporcionado");
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret as string) as {
      id: string;
      rol: string;
    };

    const roleDoc = await RoleModel.findOne({ name: decoded.rol }).lean();

    req.user = {
      id: decoded.id,
      rol: decoded.rol,
      permissions: roleDoc?.permissions ?? [],
    };

    next();
  } catch {
    throw new UnauthorizedError("Token inválido o expirado");
  }
};
// Comprueba si un permiso concreto coincide con un patrón (soporta comodín *)
const matchPermission = (pattern: string, permission: string): boolean => {
  if (pattern === "*") return true;
  const [pResource, pAction] = pattern.split(":");
  const [permResource, permAction] = permission.split(":");
  if (pResource !== "*" && pResource !== permResource) return false;
  if (pAction !== "*" && pAction !== permAction) return false;
  return true;
};

// Verifica que el usuario tenga los permisos requeridos
export const permit = (...required: string[]) => {
  return (
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction,
  ): void => {
    if (!req.user) {
      throw new UnauthorizedError("Autenticación requerida");
    }

    const hasAll = required.every((reqPerm) =>
      req.user!.permissions.some((userPerm) =>
        matchPermission(userPerm, reqPerm),
      ),
    );

    if (!hasAll) {
      throw new ForbiddenError("No tienes permiso para realizar esta acción");
    }

    next();
  };
};
