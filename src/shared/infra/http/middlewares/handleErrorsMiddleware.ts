import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';

const handleErrorsMiddleware = (
  err: AppError,
  _request: Request,
  response: Response,
  next: NextFunction,
): Response | void => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return next(err);
};

export default handleErrorsMiddleware;
