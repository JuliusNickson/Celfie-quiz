import type { NextFunction, Request, Response } from "express";
import { adminService } from "../services/adminService.js";

export async function getStats(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const stats = await adminService.getStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
}
