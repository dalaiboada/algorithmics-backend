import { CustomError } from "@/errors/custom.error";
import { Request, Response, NextFunction } from "express";
import { config } from "@/config";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error(`[Error Log]: ${err.message}`);

  // Personalizado
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  // Express errors
  const status = (err as any).status || (err as any).statusCode;
  if (status && typeof status === "number") {
    res.status(status).json({ error: err.message || "Error en la petición" });
    return;
  }

  // Default
  res.status(500).json({
    error: "Error interno del servidor",
    ...(config.nodeEnv === "development" && { details: err.message }),
  });
};
