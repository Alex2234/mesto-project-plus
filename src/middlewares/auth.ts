import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SessionRequest } from "../types";
import { ERROR_MESSAGES } from "../utils/constants";
import { UnauthorizedError } from "../errors/customErrors";

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError(ERROR_MESSAGES.NECESSARY_AUTHORIZED));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, "some-secret-key") as JwtPayload;
  } catch (err) {
    return next(new UnauthorizedError(ERROR_MESSAGES.NECESSARY_AUTHORIZED));
  }

  req.user = payload;

  next();
};
