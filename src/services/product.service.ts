import { Product } from "@prisma/client";
import { DataBase } from "../db";
import { ProductModel } from "../models/product.model";
import { ShopProductsModel } from "../models/shopProducts.model";

export class ProductService {
  async getAllProducts(): Promise<Product[]> {
    return await DataBase.getInstance().product.findMany();
  }

  async getProduct(id: number): Promise<Product> {
    return await DataBase.getInstance().product.findFirst({
      where: {
        id: id,
      },
      include: {
        stock: {
          select: {
            id: true,
            shop: {
              select: {
                shop_name: true,
              },
            },
            quantity: true,
          },
        },
      },
    });
  }

  async getShopProducts(shop: number): Promise<ShopProductsModel[]> {
    return await DataBase.getInstance().stock.findMany({
      where: {
        id_shop: shop,
      },
      select: {
        shop: {
          select: {
            shop_name: true,
          },
        },
        product: {
          select: {
            product_code: true,
            product_name: true,
            product_description: true,
            um: true,
            price: true,
          },
        },
        quantity: true,
      },
    });
  }

  async deleteProduct(id: number): Promise<Product> {
    try {
      return await DataBase.getInstance().product.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      return null;
    }
  }

  async createProduct(body: ProductModel): Promise<Product> {
    return await DataBase.getInstance().product.create({ data: body });
  }
}
