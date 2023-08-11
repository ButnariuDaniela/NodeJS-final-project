import { createHash, randomBytes } from "crypto";
import * as admin from "firebase-admin";
import { FIRESTORE_COLECTIONS } from "../config/firestore";
import { RegisterBody } from "../models/register-body.model";
import { LoginBody } from "../models/login-body.model";

export class AuthService {
  db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  async register(body: RegisterBody): Promise<string> {
    const salt = randomBytes(16).toString("hex");
    const password = `${body.password}:${salt}`;
    const hash = createHash("sha256").update(password).digest("hex");
    return `${hash}/${salt}`;
  }

  async logIn(body: LoginBody): Promise<boolean> {
    const user = await this.db
      .collection(FIRESTORE_COLECTIONS.PROJECT_USERS)
      .where("email", "==", body.email)
      .get();
    const passwordSaved = user.docs[0].data().password;
    const [hash, salt] = passwordSaved.split("/");
    const password = `${body.password}:${salt}`;
    const currentHash = createHash("sha256").update(password).digest("hex");
    if (currentHash === hash) return true;
    return false;
  }

  async getUsers() {
    const result = await this.db
      .collection(FIRESTORE_COLECTIONS.PROJECT_USERS)
      .get();
    const users = result.docs.map((doc) => doc.data());
    return users;
  }
}
