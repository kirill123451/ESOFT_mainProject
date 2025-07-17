import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      type: 'VALIDATION_ERROR',
      errors: err.errors.map(e => ({
        path: e.path,
        message: e.message
      }))
    })
  }
  
  res.status(500).json({ error: 'Internal Server Error' })
}