import { Request, Response, NextFunction } from "express";
import { UserService } from "@/services/user.service";

export class UserController {
  constructor(private userService: UserService) {}

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };


}
