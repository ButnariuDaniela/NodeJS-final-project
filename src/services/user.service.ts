import { RegisterBody } from "../models/register-body.model";
import * as admin from "firebase-admin";
import { FIRESTORE_COLECTIONS } from "../config/firestore";

export class UserService {
  db: FirebaseFirestore.Firestore;
  constructor() {
    this.db = admin.firestore();
  }

  async create(body: RegisterBody): Promise<void> {
    const jsonString = JSON.stringify(body);
    await this.db
      .collection(FIRESTORE_COLECTIONS.PROJECT_USERS)
      .add(JSON.parse(jsonString));
  }

  async verify(email: string): Promise<boolean> {
    const user = await this.db
      .collection(FIRESTORE_COLECTIONS.PROJECT_USERS)
      .where("email", "==", email)
      .get();
    if (user.docs.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  async getUsers(): Promise<string[]> {
    const res = await this.db
      .collection(FIRESTORE_COLECTIONS.PROJECT_USERS)
      .get();
    const emails = res.docs.map((doc) => doc.data().email);
    return emails;
  }
}
