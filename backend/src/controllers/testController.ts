import type { NextFunction, Request, Response } from "express";
import { testService } from "../services/testService.js";

export async function getTest(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await testService.getStatus();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function getSchemaTest(
  _req: Request,
  res: Response,
) {
  try {
    const result = await testService.getSchemaStatus();
    res.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database schema error";

    res.status(500).json({
      error: "Database schema is not ready",
      details: message,
    });
  }
}
