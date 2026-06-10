import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsBoolean,
  IsEnum,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  nombre!: string;

  @IsString()
  apellido!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6, { message: "La clave debe tener mínimo 6 caracteres" })
  clave!: string;

  @IsOptional()
  @IsEnum(["Administrador", "Instructor", "Estudiante"])
  rol?: string;

  @IsOptional()
  @IsBoolean()
  twoFactorEnabled?: boolean;
}
