import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = (req: Request, res: Response) => {
  return User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() =>
      res.status(500).send({ message: "Произошла ошибка на сервере" })
    );
};

export const getUserId = (req: Request, res: Response) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      return res.send({ data: user });
    })
    .catch((err) =>
      res.status(500).send({ message: "Произошла ошибка на сервере" })
    );
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Переданы некорректные данные при создании пользователя",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка на сервере" });
    });
};

export const updateUser = (req: Request, res: Response) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    res.locals.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Переданы некорректные данные при обновлении профиля",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка на сервере" });
    });
};

export const updateAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    res.locals.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Переданы некорректные данные при обновлении аватара",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка на сервере" });
    });
};
