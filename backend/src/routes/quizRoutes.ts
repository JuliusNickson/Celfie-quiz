import { Router } from "express";
import { getQuizResult, submitQuiz } from "../controllers/quizController.js";
import { validateBody } from "../middleware/validation.js";
import { submitQuizSchema } from "../types/quiz.js";

const router = Router();

router.get("/result/:participantId", getQuizResult);
router.post("/submit", validateBody(submitQuizSchema), submitQuiz);

export default router;
