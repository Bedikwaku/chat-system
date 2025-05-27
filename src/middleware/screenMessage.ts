import { Request, Response, NextFunction } from "express";
import { Logger } from "../objects/Logging/logger.js";

export const screenMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Stub for future content moderation
  Logger.warn("screenMessage: Content moderation not implemented yet");
  next();
};
