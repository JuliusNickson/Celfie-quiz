import { Router } from "express";
import adminRoutes from "./adminRoutes.js";
import participantRoutes from "./participantRoutes.js";
import quizRoutes from "./quizRoutes.js";
import testRoutes from "./testRoutes.js";

const router = Router();

router.use("/admin", adminRoutes);
router.use("/participants", participantRoutes);
router.use("/quiz", quizRoutes);
router.use("/test", testRoutes);

export default router;
