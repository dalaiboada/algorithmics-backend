import nodemailer from "nodemailer";
import { config } from "@/config";
import { welcomeEmailHtml } from "@/templates/welcome-email";
import { resetPasswordEmailHtml } from "@/templates/reset-password-email";

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.gmailUser,
        pass: config.gmailAppPassword,
      },
    });
  }

  async sendWelcomeEmail(to: string, nombre: string): Promise<void> {
    await this.transporter.sendMail({
      from: `Algorithmics <${config.gmailUser}>`,
      to,
      subject: "Bienvenido a Algorithmics",
      html: welcomeEmailHtml(nombre),
    });
  }

  async sendResetPasswordEmail(
    to: string,
    nombre: string,
    resetLink: string,
  ): Promise<void> {
    await this.transporter.sendMail({
      from: `Algorithmics <${config.gmailUser}>`,
      to,
      subject: "Recuperación de contraseña",
      html: resetPasswordEmailHtml(nombre, resetLink),
    });
  }
}
