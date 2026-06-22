import { IsString, Length } from "class-validator";

export class VerifySetup2faDto {
  @IsString()
  @Length(6, 6, { message: "El código debe tener 6 caracteres" })
  token!: string;
}
