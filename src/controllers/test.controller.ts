import { Request, Response } from "express";
import { getTestMessage } from "@/services/test.service";

export const getTest = (_req: Request, res: Response): void => {
  const data = getTestMessage();
  res.status(200).json(data);
};
