import { Request, Response, NextFunction } from "express";
import { send } from "process";
import { generateKey } from "../services/Cryptography/encryptionService.js";
import { Logger } from "../objects/Logging/logger.js";

export interface AuthOptions {
  // Extend with additional options as needed
}

export abstract class AuthMiddleware {
  protected options: AuthOptions;

  constructor(options: AuthOptions = {}) {
    this.options = options;
  }

  // Main middleware handler to be implemented by subclasses
  abstract handle(req: Request, res: Response, next: NextFunction): void;

  // Helper to bind the handler for use in Express
  getMiddleware() {
    return this.handle.bind(this);
  }
}

export class DefaultAuthMiddleware extends AuthMiddleware {
  handle(req: Request, res: Response, next: NextFunction) {
    // Default authentication logic
    // For example, check for a valid session or token
    const isAuthenticated = true; // Replace with actual authentication logic
    const getAuthenticationMetadata = async () => {
      return {
        sender: "default-sender", // Replace with actual sender logic
        timestamp: new Date().toISOString(),
        requestId: "default-request-id", // Replace with actual request ID logic
      };
    };
    Logger.debug("DefaultAuthMiddleware: Checking authentication status");
    if (!isAuthenticated) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const sender = "default-sender"; // Replace with actual sender logic
    const timestamp = new Date().toISOString();
    const requestId = generateKey();

    (req as any).meta = {
      sender,
      timestamp,
      requestId,
    };

    next();
  }
}
// Example of extending the generic AuthMiddleware
// Uncomment and implement as needed
/*
export class TokenAuthMiddleware extends AuthMiddleware {
  handle(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Token validation logic here
    next();
  }
}
*/
