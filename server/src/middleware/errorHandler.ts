import { NextFunction, Request, Response } from "express";
import { ERRORS } from "../constants";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send({
    title: ERRORS[res.statusCode || "123"] || "Contact Dev",
    message: err.message,
    success: false,
    stackTrace: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};
