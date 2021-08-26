import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';

const handleErrorsMiddleware = (
  err: Error,
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

  if (err instanceof Error) {
    console.log(err);
    return response.status(500).json({
      status: 'error',
      message: 'internal server error',
    });
  }

  return next(err);
};

export default handleErrorsMiddleware;
