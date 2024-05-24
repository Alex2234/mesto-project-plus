import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import { HTTP_STATUS_CODES, ERROR_MESSAGES } from "../utils/constants";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MeRequest } from "../types";

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((users) => res.status(HTTP_STATUS_CODES.OK).send({ data: users }))
    .catch(next);
};

export const getUserId = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(HTTP_STATUS_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      return res.send({ data: user });
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({ name, about, avatar, email, password: hash });
    })
    .then((user) => {
      res.status(HTTP_STATUS_CODES.CREATED).send({ data: user });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(HTTP_STATUS_CODES.CONFLICT).send({
          message: "Пользователь с таким email уже существует",
        });
      } else if (err.name === "ValidationError") {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({
          message: ERROR_MESSAGES.VALIDATION_ERROR,
        });
      }
      return next;
    });
};

export const updateUser = (
  req: MeRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, about } = req.body;
  const userId = req.user?._id;

  return User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res
          .status(HTTP_STATUS_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({
          message: ERROR_MESSAGES.VALIDATION_ERROR,
        });
      }
      return next;
    });
};

export const updateAvatar = (
  req: MeRequest,
  res: Response,
  next: NextFunction
) => {
  const { avatar } = req.body;
  const userId = req.user?._id;

  return User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res
          .status(HTTP_STATUS_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({
          message: ERROR_MESSAGES.VALIDATION_ERROR,
        });
      }
      return next;
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return res
          .status(HTTP_STATUS_CODES.NOT_FOUND_LOGIN)
          .send({ message: ERROR_MESSAGES.EMAIL_OR_PASSWORD_NOT_FOUND });
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return res
            .status(HTTP_STATUS_CODES.BAD_REQUEST)
            .send({ message: ERROR_MESSAGES.EMAIL_OR_PASSWORD_ERROR });
        }
        const token = jwt.sign({ _id: user._id }, "some-secret-key", {
          expiresIn: "7d",
        });
        return res.send({ token });
      });
    })
    .catch(next);
};

export const getUserMe = (
  req: MeRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(HTTP_STATUS_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      return res.send({ data: user });
    })
    .catch(next);
};
