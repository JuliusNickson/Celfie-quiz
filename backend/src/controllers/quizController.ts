import type { NextFunction, Request, Response } from "express";
import { quizService } from "../services/quizService.js";

export async function submitQuiz(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await quizService.submit(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "PARTICIPANT_NOT_FOUND") {
        res.status(404).json({ error: "Participant not found" });
        return;
      }

      if (error.message === "QUIZ_ALREADY_SUBMITTED") {
        res.status(409).json({ error: "Quiz already submitted" });
        return;
      }
    }

    next(error);
  }
}

export async function getQuizResult(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const participantId = req.params.participantId;

    if (!participantId || Array.isArray(participantId)) {
      res.status(400).json({ error: "Invalid participant ID" });
      return;
    }

    const result = await quizService.getResult(participantId);
    res.json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "QUIZ_RESULT_NOT_FOUND") {
      res.status(404).json({ error: "Quiz result not found" });
      return;
    }

    next(error);
  }
}
