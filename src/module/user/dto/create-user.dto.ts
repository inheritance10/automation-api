import { IsEmail } from "class-validator";

export class CreateUserDto {

  @IsEmail()
  email: string;

  password: string;

  name: string;

  surname: string;

  role: string;

  phone: string;

  isPayment: boolean;
}
