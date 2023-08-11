import { ShopController } from "../controllers/shop.controller";
import { Router } from "express";
import { verifyToken } from "../utils/verify-token";

export default class ShopRoute {
  private readonly router = Router();
  private readonly shopController = new ShopController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(
      "/shops",
      verifyToken,
      async (req, res) => await this.shopController.getShops(req, res)
    );
    this.router.get(
      "/shops/:id",
      verifyToken,
      async (req, res) => await this.shopController.getShop(req, res)
    );
    this.router.post(
      "/shop",
      verifyToken,
      async (req, res) => await this.shopController.addShop(req, res)
    );
    this.router.delete(
      "/shops/:id",
      verifyToken,
      async (req, res) => await this.shopController.deleteShop(req, res)
    );
  }

  get routes(): Router {
    return this.router;
  }
}
