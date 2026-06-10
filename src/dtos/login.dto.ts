import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail({}, { message: "Debe proporcionar un correo electrónico válido" })
  email!: string;

  @IsString()
  @MinLength(6, { message: "La clave debe tener mínimo 6 caracteres" })
  clave!: string;
}
