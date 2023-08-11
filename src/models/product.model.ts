import {
  IsPositive,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from "class-validator";

export class ProductModel {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  product_code: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  product_name: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  product_description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  um: string;

  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
