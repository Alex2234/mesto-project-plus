import { Request, Response, NextFunction } from "express";
import { ErrorCenter } from "../types";
import { HTTP_STATUS_CODES, ERROR_MESSAGES } from "../utils/constants";

const errorCenter = (
  err: ErrorCenter,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    message = ERROR_MESSAGES.SERVER_ERROR,
  } = err;
  res.status(statusCode).send({ message });
};

export default errorCenter;
