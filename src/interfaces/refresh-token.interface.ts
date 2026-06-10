import { Types } from "mongoose";

export interface IRefreshToken {
  _id?: Types.ObjectId | string;
  user: Types.ObjectId | string;
  tokenHash: string;
  expiresAt: Date;
  revoked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
