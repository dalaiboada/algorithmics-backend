import { Request, Response, NextFunction } from 'express';

export type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export type AuthenticatedRequest = Request & {
  user?: {
    id: string;
    rol: string;
    permissions: string[];
  };
};
