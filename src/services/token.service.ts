var jwt = require("jsonwebtoken");
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

export class TokenService {
  constructor() {}

  async genereateJWT(req, res, useremail: string): Promise<string> {
    const payload = { useremail };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });
    return token;
  }
}
