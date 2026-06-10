import { Router } from "express";
import { AuthController } from "@/controllers/auth.controller";
import { AuthService } from "@/services/auth.service";
import { UserRepository } from "@/repositories/user.repository";
import { validationMiddleware } from "@/middlewares/validation.middleware";
import { authenticate } from "@/middlewares/auth.middleware";
import { LoginDto } from "@/dtos/login.dto";

const router = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post("/login", validationMiddleware(LoginDto), authController.login);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);
router.post("/logout-all", authenticate, authController.logoutAll);

export default router;
