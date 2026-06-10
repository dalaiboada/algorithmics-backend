import { UserRepository } from "@/repositories/user.repository";
import { BadRequestError } from "@/errors/http.errors";
import bcrypt from "bcrypt";
import { config } from "@/config";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(userData: {
    nombre: string;
    apellido: string;
    email: string;
    clave: string;
    rol?: string;
  }) {
    const { email, clave } = userData;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new BadRequestError("El correo electrónico ya está registrado");
    }

    const hashedPassword = await bcrypt.hash(clave, config.saltRounds);

    const newUser = {
      ...userData,
      clave: hashedPassword,
      rol: userData.rol || "Estudiante",
      habilitado: false,
    };

    return await this.userRepository.create(newUser);
  }
}
