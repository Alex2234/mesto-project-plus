import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface SessionRequest extends Request {
  user?: string | JwtPayload;
}

export interface MeRequest extends Request {
  user?: {
    _id: string;
  };
}

export interface ErrorCenter {
  statusCode: number;
  message: string;
}
