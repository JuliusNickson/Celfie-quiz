import { Router } from "express";
import { getSchemaTest, getTest } from "../controllers/testController.js";

const router = Router();

router.get("/", getTest);
router.get("/schema", getSchemaTest);

export default router;
