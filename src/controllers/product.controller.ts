import { Request, Response } from "express";
import { validateSync } from "class-validator";
import { ProductModel } from "../models/product.model";
import { ProductService } from "../services/product.service";
import { isNumber } from "../utils/check-number-helper";

export class ProductController {
  private readonly productService = new ProductService();

  public async getProducts(req: Request, res: Response): Promise<void> {
    const shop = +req.query.shop;

    if (shop) {
      const products = await this.productService.getShopProducts(shop);
      if (products.length === 0) {
        res.status(400);
        res.json({ message: "No product found" });
        return;
      }
      res.status(200);
      res.send(products);
      return;
    }

    if (req.url.includes("?shop")) {
      res.status(400).json({ message: "Incorect shop id!" });
      return;
    }

    const products = await this.productService.getAllProducts();
    res.status(200);
    res.send(products);
  }

  public async getProduct(req: Request, res: Response) {
    const id = +req.params.id;

    if (!isNumber(req.params.id)) {
      res.status(400).json({ message: "Incorect route!" });
      return;
    }

    const product = await this.productService.getProduct(id);
    if (!product) {
      res.status(400);
      res.send({ message: "Product not found" });
      return;
    }
    res.status(200);
    res.send(product);
  }

  public async deleteProduct(req: Request, res: Response) {
    const id = +req.params.id;
    const product = await this.productService.deleteProduct(id);
    if (!product) {
      res.status(400);
      res.json({ message: "Product not found" });
      return;
    }
    res.status(200);
    res.send("Product deleted");
    res.end();
  }

  public async addProduct(req: Request, res: Response): Promise<void> {
    const body = new ProductModel(req.body);
    const errors = validateSync(body);
    if (errors.length > 0) {
      res.status(400);
      res.json(errors);
      return;
    }
    const product = await this.productService.createProduct(body);
    if (!product) {
      res.status(400);
      res.json({ message: "Product creation failed" });
      return;
    }
    res.status(201);
    res.send("Product added");
    res.end();
  }
}
