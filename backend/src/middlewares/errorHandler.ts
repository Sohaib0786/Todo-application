import { Request, Response, NextFunction } from "express";
import ErrorLog from "../models/ErrorLog";

export default async function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  // Normalize message
  const message = err?.message || "Internal Server Error";
  const status = err?.status || 500;

  // Log to console for dev
  console.error("Error:", message);
  if (err?.stack) console.error(err.stack);

  // Attempt to write error log to DB (best-effort)
  try {
    await ErrorLog.create({
      message,
      stack: err?.stack,
      route: req.originalUrl,
      method: req.method,
      meta: {
        body: req.body ? { ...req.body, password: undefined } : undefined,
        query: req.query,
        params: req.params
      }
    });
  } catch (e) {
    console.error("Failed to save error log:", e);
  }

  // Response
  res.status(status).json({ message });
}
