import { Request, Response, NextFunction } from "express";
import { AuthService } from "@/services/auth.service";
import { UserService } from "@/services/user.service";
import { config } from "@/config/index";
import { AuthenticatedRequest } from "@/types/index";

export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email, clave } = req.body;
      const { user, token, refreshToken } = await this.authService.login(
        email,
        clave,
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: config.nodeEnv === "production",
        sameSite: "strict",
        maxAge: config.cookieMaxAge,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: config.nodeEnv === "production",
        sameSite: "strict",
        path: "/api/v1/auth",
        maxAge: config.refreshCookieMaxAge,
      });

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  refresh = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const rawToken = req.cookies?.refreshToken;
      const result = await this.authService.refreshAccessToken(rawToken);

      res.cookie("token", result.token, {
        httpOnly: true,
        secure: config.nodeEnv === "production",
        sameSite: "strict",
        maxAge: config.cookieMaxAge,
      });

      if (result.refreshToken) {
        res.cookie("refreshToken", result.refreshToken, {
          httpOnly: true,
          secure: config.nodeEnv === "production",
          sameSite: "strict",
          path: "/api/v1/auth",
          maxAge: config.refreshCookieMaxAge,
        });
      }

      res.status(200).json({ message: "Token renovado correctamente" });
    } catch (error) {
      next(error);
    }
  };

  logout = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const rawToken = req.cookies?.refreshToken;
      await this.authService.revokeRefreshToken(rawToken);

      res.clearCookie("token", {
        httpOnly: true,
        secure: config.nodeEnv === "production",
        sameSite: "strict",
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: config.nodeEnv === "production",
        sameSite: "strict",
        path: "/api/v1/auth",
      });

      res.status(200).json({ message: "Sesión cerrada correctamente" });
    } catch (error) {
      next(error);
    }
  };

  register = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = await this.userService.create({
        ...req.body,
        rol: "Estudiante",
      });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  logoutAll = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.authService.revokeAllUserTokens(req.user!.id);

      res.clearCookie("token", {
        httpOnly: true,
        secure: config.nodeEnv === "production",
        sameSite: "strict",
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: config.nodeEnv === "production",
        sameSite: "strict",
        path: "/api/v1/auth",
      });

      res.status(200).json({ message: "Sesión cerrada en todos los dispositivos" });
    } catch (error) {
      next(error);
    }
  };
}
