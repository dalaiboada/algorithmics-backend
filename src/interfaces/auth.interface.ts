import { IUser } from "./user.interface";

export interface AuthResponse {
  user: IUser;
  token: string;
  refreshToken?: string;
}

export interface RefreshResponse {
  token: string;
  refreshToken: string;
}

export interface LoginResponse {
  user?: IUser;
  token?: string;
  refreshToken?: string;
  require2FA?: boolean;
  userId?: string;
}
