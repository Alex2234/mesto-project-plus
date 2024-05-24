import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SessionRequest } from "../types";
import { HTTP_STATUS_CODES, ERROR_MESSAGES } from "../utils/constants";

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .send({ message: ERROR_MESSAGES.NECESSARY_AUTHORIZED });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    return res
      .status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .send({ message: ERROR_MESSAGES.NECESSARY_AUTHORIZED });
  }

  req.user = payload;

  next();
};
