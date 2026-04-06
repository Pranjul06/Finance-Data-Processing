import { Request, Response, NextFunction } from 'express';

export const requireRoles = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!(req as any).user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!roles.includes((req as any).user.role)) {
      return res.status(403).json({ error: `Forbidden: Requires one of following roles: ${roles.join(', ')}` });
    }

    next();
  };
};

export const ROLES = {
  VIEWER: 'VIEWER',
  ANALYST: 'ANALYST',
  ADMIN: 'ADMIN',
};
