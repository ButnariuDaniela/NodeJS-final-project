import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export default class authControllerRoute {
  private readonly router = Router();
  private readonly authController = new AuthController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(
      "/users",
      async (req, res) => await this.authController.getUsers(req, res)
    );
    this.router.post(
      "/login",
      async (req, res) => await this.authController.logIn(req, res)
    );
    this.router.post(
      "/register",
      async (req, res) => await this.authController.register(req, res)
    );
  }

  get routes(): Router {
    return this.router;
  }
}
