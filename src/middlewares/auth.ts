import { Request, Response, NextFunction } from 'express';
import { users } from '../db';

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers['x-user-id'] as string;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: Missing x-user-id header' });
  }

  try {
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: User not found' });
    }

    if (user.status === 'INACTIVE') {
      return res.status(403).json({ error: 'Forbidden: User is inactive' });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    next(error);
  }
};
