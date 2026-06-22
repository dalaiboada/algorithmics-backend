import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId | string;
  nombre: string;
  apellido: string;
  email: string;
  clave?: string;
  habilitado: boolean;
  rol: string;
  provider: "local" | "google";
  googleId?: string;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
