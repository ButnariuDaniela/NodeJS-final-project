import { Shop } from "@prisma/client";
import { DataBase } from "../db";
import { ShopModel } from "../models/shop.model";

export class ShopService {
  async getAllShops(): Promise<Shop[]> {
    return await DataBase.getInstance().shop.findMany();
  }

  async getShop(id: number): Promise<Shop> {
    return await DataBase.getInstance().shop.findFirst({
      where: {
        id: id,
      },
    });
  }

  async deleteShop(id: number): Promise<Shop> {
    try {
      return await DataBase.getInstance().shop.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      return null;
    }
  }

  async createShop(body: ShopModel): Promise<Shop> {
    return await DataBase.getInstance().shop.create({ data: body });
  }
}
