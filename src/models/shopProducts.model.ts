import { IsNotEmpty, IsPositive } from "class-validator";
import { ShopModel } from "./shop.model";
import { ProductModel } from "./product.model";

export class ShopProductsModel {
  shop: Omit<ShopModel, "id" | "location" | "shop_owner">;

  product: Omit<ProductModel, "id">;

  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
