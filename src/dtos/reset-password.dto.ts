import { IsString, IsNotEmpty, MinLength } from "class-validator";

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  token!: string;

  @IsString()
  @MinLength(6, { message: "La clave debe tener mínimo 6 caracteres" })
  clave!: string;
}
