import crypto from "crypto";
import { UserRepository } from "@/repositories/user.repository";
import { AuthResponse, RefreshResponse } from "@/interfaces/auth.interface";
import { config } from "@/config/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "@/interfaces/user.interface";
import { BadRequestError, NotFoundError, UnauthorizedError } from "@/errors/http.errors";
import { RefreshTokenModel } from "@/models/refresh-token.model";
import { EmailService } from "@/services/email.service";

type DBUserPayload = IUser & { clave?: string; __v?: number };

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService,
  ) {}

  async register(data: {
    nombre: string;
    apellido: string;
    email: string;
    clave: string;
  }) {
    const { email, clave } = data;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new BadRequestError("El correo electrónico ya está registrado");
    }

    const hashedPassword = await bcrypt.hash(clave, config.saltRounds);

    const user = await this.userRepository.create({
      ...data,
      clave: hashedPassword,
      rol: "Estudiante",
      habilitado: false,
    });

    await this.emailService.sendWelcomeEmail(email, data.nombre);

    return user;
  }

  async login(email: string, clave: string): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmailWithPassword(email);

    if (!user) {
      throw new UnauthorizedError("Credenciales inválidas");
    }

    const isMatch = await bcrypt.compare(clave, user.clave);
    if (!isMatch) {
      throw new UnauthorizedError("Credenciales inválidas");
    }

    const token = jwt.sign(
      {
        id: user._id?.toString(),
        rol: user.rol,
      },
      config.jwtSecret as string,
      {
        expiresIn: config.jwtExpiration,
      },
    );

    const refreshToken = await this.generateRefreshToken(user._id?.toString()!);

    const { clave: _, __v: _v, ...userWithoutPassword } = user as DBUserPayload;

    return {
      user: userWithoutPassword as IUser,
      token,
      refreshToken,
    };
  }

  // Genera un nuevo access token a partir de un refresh token válido
  async refreshAccessToken(rawToken: string): Promise<RefreshResponse> {
    if (!rawToken) {
      throw new UnauthorizedError("Refresh token no proporcionado");
    }

    const tokenHash = this.hashToken(rawToken);
    const storedToken = await RefreshTokenModel.findOne({
      tokenHash,
      revoked: false,
    });

    if (!storedToken) {
      throw new UnauthorizedError("Refresh token inválido o revocado");
    }

    if (storedToken.expiresAt < new Date()) {
      await storedToken.deleteOne();
      throw new UnauthorizedError("Refresh token expirado");
    }

    const user = await this.userRepository.findById(
      storedToken.user.toString(),
    );
    if (!user) {
      await storedToken.deleteOne();
      throw new UnauthorizedError("Usuario no encontrado");
    }

    await storedToken.deleteOne();

    const newToken = jwt.sign(
      {
        id: user._id?.toString(),
        rol: user.rol,
      },
      config.jwtSecret as string,
      {
        expiresIn: config.jwtExpiration,
      },
    );

    const newRefreshToken = await this.generateRefreshToken(
      user._id?.toString()!,
    );

    return {
      token: newToken,
      refreshToken: newRefreshToken,
    };
  }

  // Revoca un refresh token específico (ej: logout de un dispositivo)
  async revokeRefreshToken(rawToken: string): Promise<void> {
    if (!rawToken) return;

    const tokenHash = this.hashToken(rawToken);
    await RefreshTokenModel.updateOne(
      { tokenHash },
      { $set: { revoked: true } },
    );
  }

  // Revoca todos los refresh tokens de un usuario (ej: logout de todos los dispositivos)
  async revokeAllUserTokens(userId: string): Promise<void> {
    await RefreshTokenModel.updateMany(
      { user: userId, revoked: false },
      { $set: { revoked: true } },
    );
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return;
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = this.hashToken(rawToken);
    const expiresAt = new Date(Date.now() + 3600000);

    await this.userRepository.setResetToken(
      user._id!.toString(),
      tokenHash,
      expiresAt,
    );

    const resetLink = `${config.frontendUrl}/reset-password?token=${rawToken}`;
    await this.emailService.sendResetPasswordEmail(
      email,
      user.nombre,
      resetLink,
    );
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const tokenHash = this.hashToken(token);
    const user = await this.userRepository.findByResetToken(tokenHash);

    if (!user) {
      throw new BadRequestError("Token inválido o expirado");
    }

    const hashedPassword = await bcrypt.hash(newPassword, config.saltRounds);
    await this.userRepository.updatePassword(
      user._id!.toString(),
      hashedPassword,
    );
  }

  private async generateRefreshToken(userId: string): Promise<string> {
    const rawToken = crypto.randomBytes(40).toString("hex");
    const tokenHash = this.hashToken(rawToken);

    const expiresAt = new Date(Date.now() + config.refreshCookieMaxAge);

    await RefreshTokenModel.create({
      user: userId,
      tokenHash,
      expiresAt,
    });

    return rawToken;
  }

  private hashToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex");
  }
}
