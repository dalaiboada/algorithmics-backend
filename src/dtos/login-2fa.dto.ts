import { IsString, Length, IsMongoId } from "class-validator";

export class Login2faDto {
  @IsMongoId({ message: "ID de usuario inválido" })
  userId!: string;

  @IsString()
  @Length(6, 6, { message: "El código debe tener 6 caracteres" })
  token!: string;
}
