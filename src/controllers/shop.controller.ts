import { Request, Response } from "express";
import { validateSync } from "class-validator";
import { ShopModel } from "../models/shop.model";
import { getId } from "../utils/get-id-helper";
import { ShopService } from "../services/shop.service";
import { isNumber } from "../utils/check-number-helper";

export class ShopController {
  private readonly shopService = new ShopService();

  public async getShops(req: Request, res: Response): Promise<void> {
    const shops = await this.shopService.getAllShops();
    res.status(200);
    res.send(shops);
  }

  public async getShop(req: Request, res: Response) {
    const id = getId(req);

    if (!isNumber(req.params.id)) {
      res.status(400).json({ message: "Incorect id shop format!" });
      return;
    }

    const shop = await this.shopService.getShop(id);
    if (!shop) {
      res.status(400);
      res.json({ message: "Shop not found" });
      return;
    }
    res.send(shop);
  }

  public async deleteShop(req: Request, res: Response) {
    const id = getId(req);
    const shop = await this.shopService.deleteShop(id);
    if (!shop) {
      res.status(400);
      res.json({ message: "Shop not found" });
      return;
    }
    res.status(200);
    res.send("Shop deleted");
    res.end();
  }

  public async addShop(req: Request, res: Response): Promise<void> {
    const body = new ShopModel(req.body);
    const errors = validateSync(body);
    if (errors.length > 0) {
      res.status(400);
      res.json(errors);
      return;
    }
    const shop = await this.shopService.createShop(body);
    if (!shop) {
      res.status(400);
      res.json({ message: "Shop creation failed" });
      return;
    }
    res.status(201);
    res.send("Shop added");
    res.end();
  }
}
