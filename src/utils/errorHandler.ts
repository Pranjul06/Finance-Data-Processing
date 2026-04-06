import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: (err as any).errors || err,
    });
  }

  // Known Prisma errors?
  if (err.code && typeof err.code === 'string') {
    // simplified prisma error handling
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'Unique constraint failed' });
    }
  }

  console.error('[Error Handler]', err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(status).json({ error: message });
};
