import cors from "cors";
import express from "express";
import apiRoutes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter((origin): origin is string => Boolean(origin));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (_req, res) => {
  res.json({
    name: "Digital Superpower API",
    endpoints: {
      health: "/health",
      test: "/api/test",
      register: "POST /api/participants/register",
      submitQuiz: "POST /api/quiz/submit",
      adminLogin: "POST /api/admin/login",
      adminStats: "GET /api/admin/stats",
    },
  });
});

app.use("/api", apiRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use(errorHandler);

export default app;
