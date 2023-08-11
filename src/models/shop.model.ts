import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class ShopModel {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  shop_name: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  location: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  shop_owner: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
