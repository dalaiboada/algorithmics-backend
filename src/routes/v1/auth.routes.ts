import { Router } from "express";
import { AuthController } from "@/controllers/auth.controller";
import { AuthService } from "@/services/auth.service";
import { EmailService } from "@/services/email.service";
import { UserRepository } from "@/repositories/user.repository";
import { validationMiddleware } from "@/middlewares/validation.middleware";
import { authenticate } from "@/middlewares/auth.middleware";
import { LoginDto } from "@/dtos/login.dto";
import { CreateUserDto } from "@/dtos/create-user.dto";
import { ForgotPasswordDto } from "@/dtos/forgot-password.dto";
import { ResetPasswordDto } from "@/dtos/reset-password.dto";
import { VerifySetup2faDto } from "@/dtos/verify-setup-2fa.dto";
import { Login2faDto } from "@/dtos/login-2fa.dto";

const router = Router();

const userRepository = new UserRepository();
const emailService = new EmailService();
const authService = new AuthService(userRepository, emailService);
const authController = new AuthController(authService);

router.post("/register", validationMiddleware(CreateUserDto), authController.register);
router.post("/login", validationMiddleware(LoginDto), authController.login);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);
router.post(
  "/forgot-password",
  validationMiddleware(ForgotPasswordDto),
  authController.forgotPassword,
);
router.post(
  "/reset-password",
  validationMiddleware(ResetPasswordDto),
  authController.resetPassword,
);
router.post("/google", authController.googleLogin);
router.post("/2fa/setup", authenticate, authController.setup2FA);
router.post("/2fa/verify-setup", authenticate, validationMiddleware(VerifySetup2faDto), authController.verifySetup2FA);
router.post("/login/2fa", validationMiddleware(Login2faDto), authController.login2FA);
router.post("/logout-all", authenticate, authController.logoutAll);

export default router;
