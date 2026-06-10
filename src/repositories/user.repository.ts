import { UserModel } from "@/models/user.model";
import { IUser } from "@/interfaces/user.interface";

export class UserRepository {
  async findById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id).lean();
  }

  async findByEmailWithPassword(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email }).select("+clave").lean();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email }).lean();
  }

  async create(userData: Partial<IUser>) {
    return await UserModel.create(userData);
  }
}
