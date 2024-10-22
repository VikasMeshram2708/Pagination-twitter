import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500);
  if (err instanceof PrismaClientKnownRequestError) {
    return res
      .json({
        message: err?.message,
      })
      .status(422);
  }
  if (err instanceof ZodError) {
    const filteredErr = err?.issues.map((e) => ({
      filed: e.path.join("."),
      message: e.message,
    }));
    return res
      .json({
        message: filteredErr,
      })
      .status(422);
  }
  return res.json({
    stack: process.env.NODE_ENV === "development" && err.stack,
    message: err.message,
  });
};
