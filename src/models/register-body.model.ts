import {
  IsString,
  MinLength,
  MaxLength,
  IsBoolean,
  IsOptional,
  IsInt,
  IsPositive,
  IsEmail,
  IsStrongPassword,
} from "class-validator";

export class RegisterBody {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name: string;

  @IsBoolean()
  @IsOptional()
  verified: boolean;

  @IsInt()
  @IsPositive()
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  accesToken = null;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
