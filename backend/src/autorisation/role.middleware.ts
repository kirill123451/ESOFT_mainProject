import { Request, Response, NextFunction } from "express"

export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if ((req as any).user?.role !== role) {
       res.status(403).json({ err: 'Доступ запрещен' });
       return;
    }
    next();
  }
}