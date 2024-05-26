import { Request, Response, NextFunction } from "express";
import { ErrorCenter } from "../types";

const errorCenter = (
  err: ErrorCenter,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500 ? "На сервере произошла ошибка" : err.message;

  res.status(statusCode).send({ message });
  next();
};

export default errorCenter;
