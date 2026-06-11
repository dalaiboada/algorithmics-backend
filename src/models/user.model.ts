import { Schema, model } from "mongoose";
import { IUser } from "@/interfaces/user.interface";

const clearSensitiveFields = (doc: any, ret: any) => {
  delete ret.__v;
  delete ret.clave;
  return ret;
};

const UserSchema = new Schema<IUser>(
  {
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    clave: { type: String, required: true, select: false },
    habilitado: { type: Boolean, default: true },
    rol: {
      type: String,
      enum: ["Administrador", "Instructor", "Estudiante"],
      default: "Estudiante",
    },
    twoFactorEnabled: { type: Boolean, default: false },
    resetPasswordToken: { type: String, default: undefined },
    resetPasswordExpires: { type: Date, default: undefined },
  },
  {
    timestamps: true,
    toObject: {
      transform: clearSensitiveFields,
    },
    toJSON: {
      transform: clearSensitiveFields,
    },
  },
);

export const UserModel = model<IUser>("User", UserSchema);
