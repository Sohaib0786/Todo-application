import express from "express";
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";

import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";
import errorHandler from "./middlewares/errorHandler";



const app = express();

// CORS: allow frontend origin
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// central error handler (must be after routes)
app.use(errorHandler);

export default app;
