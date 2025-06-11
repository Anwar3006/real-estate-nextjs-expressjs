import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: {
        id?: string;
        role?: string;
      };
    }
  }
}

// Middleware to verify internal API calls
export default (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ error: `Unauthorized. Token: ${token}` });
      return;
    }

    try {
      const decodedToken = jwt.decode(token);
      req.user = {
        id: decodedToken?.sub as string,
        role: (decodedToken as any).role,
      };

      const hasAccess = allowedRoles.includes((decodedToken as any).role);
      if (!hasAccess) {
        res.status(403).json({ error: `Access Denied` });
        return;
      }
    } catch (error: any) {
      console.error("Error decoding token: ", error.message);
      res.status(400).json({ error: `Invalid Token` });
      return;
    }

    next();
  };
};
