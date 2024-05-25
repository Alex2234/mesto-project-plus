import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../utils/constants";
import { NotFoundError } from "../errors/customErrors";

const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(ERROR_MESSAGES.ROUTE_NOT_FOUND));
};

export default notFoundRoute;
