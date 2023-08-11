import { Request, Response } from "express";
import { RegisterBody } from "../models/register-body.model";
import { validateSync } from "class-validator";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { LoginBody } from "../models/login-body.model";
import { TokenService } from "../services/token.service";

export class AuthController {
  private readonly authService = new AuthService();
  private readonly userService = new UserService();
  private readonly tokenService = new TokenService();

  async logIn(req: Request, res: Response): Promise<void> {
    const body = new LoginBody(req.body);
    const errors = validateSync(body);
    if (errors.length > 0) {
      res.status(400);
      res.json(errors);
      return;
    }
    const token = await this.tokenService.genereateJWT(req, res, body.email);
    body.accesToken = token;
    const loggedIn = await this.authService.logIn(body);
    res.status(loggedIn ? 200 : 401);
    res.send(loggedIn ? "Logged in" : "Not authorized");
  }

  async getUsers(req: Request, res: Response) {
    const users = await this.authService.getUsers();
    res.status(200).json(users);
  }

  async register(req: Request, res: Response): Promise<void> {
    const body = new RegisterBody(req.body);
    const errors = validateSync(body);
    if (errors.length > 0) {
      res.status(400);
      res.json(errors);
      return;
    }

    const existUser = await this.userService.verify(body.email);
    if (existUser) {
      res.status(409).send("Email already exist. Please login!");
      return;
    }

    const token = await this.tokenService.genereateJWT(req, res, body.email);
    body.accesToken = token;

    const complexPassword = await this.authService.register(body);
    body.password = complexPassword;
    await this.userService.create(body);
    res.status(200);
    res.send("User added");
    res.end();
  }
}
