import type { NextFunction, Request, Response } from "express";
import {
  createAdminToken,
  getAdminPassword,
  passwordsMatch,
} from "../config/adminAuth.js";

export async function loginAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const adminPassword = getAdminPassword();

    if (!adminPassword) {
      res.status(503).json({ error: "Admin access is not configured" });
      return;
    }

    if (!passwordsMatch(req.body.password, adminPassword)) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    res.json({ token: createAdminToken(adminPassword) });
  } catch (error) {
    next(error);
  }
}
