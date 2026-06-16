import { Router } from "express";
import { loginAdmin } from "../controllers/adminAuthController.js";
import { getStats } from "../controllers/adminController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { validateBody } from "../middleware/validation.js";
import { adminLoginSchema } from "../types/adminAuth.js";

const router = Router();

router.post("/login", validateBody(adminLoginSchema), loginAdmin);
router.get("/stats", requireAdmin, getStats);

export default router;
