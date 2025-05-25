import { Request, Response, NextFunction } from "express";

export const screenMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Stub for future content moderation
  next();
};
