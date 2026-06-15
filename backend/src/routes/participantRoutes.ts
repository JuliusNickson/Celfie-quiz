import { Router } from "express";
import { registerParticipant } from "../controllers/participantController.js";
import { validateBody } from "../middleware/validation.js";
import { registerParticipantSchema } from "../types/participant.js";

const router = Router();

router.post(
  "/register",
  validateBody(registerParticipantSchema),
  registerParticipant,
);

export default router;
