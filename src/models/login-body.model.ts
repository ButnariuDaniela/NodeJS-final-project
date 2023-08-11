import { IsEmail, IsStrongPassword } from "class-validator";

export class LoginBody {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  accesToken = null;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
