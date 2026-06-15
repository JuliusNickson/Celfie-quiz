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
