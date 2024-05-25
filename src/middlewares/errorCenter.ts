import { Request, Response, NextFunction } from "express";
import { ErrorCenter } from "../types";

const errorCenter = (
  err: ErrorCenter,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode = 500, message = "На сервере произошла ошибка" } = err;
  res.status(statusCode).send({ message });
  next;
};

export default errorCenter;
