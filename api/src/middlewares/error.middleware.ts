import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error | ZodError,
  _: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = res.statusCode !== 200 ? res.statusCode : 500;

  if (err instanceof ZodError) {
    res.status(400).json({
      message: err.errors.map((e) => e.message).join(', '),
    });
    return;
  }

  res.status(status).json({
    message: err.message,
    stack:
      process.env.NODE_ENV === 'production'
        ? 'Stack trace not available in production'
        : err.stack,
  });
};
