import type { NextFunction, Request, Response } from "express";
import {
  getAdminPassword,
  verifyAdminToken,
} from "../config/adminAuth.js";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const adminPassword = getAdminPassword();

  if (!adminPassword) {
    res.status(503).json({ error: "Admin access is not configured" });
    return;
  }

  const authorization = req.headers.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : null;

  if (!token || !verifyAdminToken(token, adminPassword)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
}
