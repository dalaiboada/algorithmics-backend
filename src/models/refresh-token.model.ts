import { Schema, model } from "mongoose";
import { IRefreshToken } from "@/interfaces/refresh-token.interface";

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tokenHash: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: true },
    revoked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const RefreshTokenModel = model<IRefreshToken>(
  "RefreshToken",
  RefreshTokenSchema,
);
