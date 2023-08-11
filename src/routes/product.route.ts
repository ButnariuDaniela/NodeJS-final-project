import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { verifyToken } from "../utils/verify-token";

export default class ProductRoute {
  private readonly router = Router();
  private readonly productController = new ProductController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(
      "/products",
      verifyToken,
      async (req, res) => await this.productController.getProducts(req, res)
    );
    this.router.get(
      "/products/:id",
      verifyToken,
      async (req, res) => await this.productController.getProduct(req, res)
    );
    this.router.post(
      "/product",
      verifyToken,
      async (req, res) => await this.productController.addProduct(req, res)
    );
    this.router.delete(
      "/products/:id",
      verifyToken,
      async (req, res) => await this.productController.deleteProduct(req, res)
    );
  }

  get routes(): Router {
    return this.router;
  }
}
