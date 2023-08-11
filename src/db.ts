import { PrismaClient } from "@prisma/client";

export class DataBase {
  private static instance: PrismaClient;

  private constructor() {}

  static init(): void {
    this.instance = new PrismaClient();
  }

  static getInstance(): PrismaClient {
    if (this.instance === undefined) {
      this.instance = new PrismaClient();
    }
    return this.instance;
  }
}
