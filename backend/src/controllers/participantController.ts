import type { NextFunction, Request, Response } from "express";
import { participantService } from "../services/participantService.js";

export async function registerParticipant(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const participant = await participantService.register(req.body);

    res.status(participant.isReturning ? 200 : 201).json({
      id: participant.id,
      name: participant.name,
      email: participant.email,
      prizeDrawConsent: participant.prizeDrawConsent,
      createdAt: participant.createdAt,
      quizCompleted: participant.quizCompleted,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_ALREADY_REGISTERED") {
      res.status(409).json({ error: "Email already registered" });
      return;
    }

    next(error);
  }
}
