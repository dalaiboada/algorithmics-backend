import { Router } from "express";
import { UserController } from "@/controllers/user.controller";
import { UserService } from "@/services/user.service";
import { UserRepository } from "@/repositories/user.repository";
import { CreateUserDto } from "@/dtos/create-user.dto";
import { validationMiddleware } from "@/middlewares/validation.middleware";
import { authenticate, permit } from "@/middlewares/auth.middleware";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post(
  "/",
  authenticate,
  permit("user:create"),
  validationMiddleware(CreateUserDto),
  userController.create,
);

export default router;
