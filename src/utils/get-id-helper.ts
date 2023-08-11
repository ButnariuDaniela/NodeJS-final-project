import { Request } from "express";

export function getId(req: Request) {
  return parseInt(req.params.id, 10);
}
