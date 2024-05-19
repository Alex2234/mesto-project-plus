import { Request, Response } from "express";
import Card from "../models/card";

export const getCards = (req: Request, res: Response) => {
  return Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const owner = res.locals.user._id;

  return Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Переданы некорректные данные при создании карточки",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка на сервере" });
    });
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;

  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Карточка не найдена" });
      }

      return card
        .remove()
        .then(() => res.send({ message: "Карточка удалена" }));
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

export const likeCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  const userId = res.locals.user._id;

  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Карточка не найдена" });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({
          message: "Переданы некорректные данные для постановки лайка",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка на сервере" });
    });
};

export const dislikeCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  const userId = res.locals.user._id;

  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Карточка не найдена" });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(400)
          .send({ message: "Переданы некорректные данные для снятия лайка" });
      }
      return res.status(500).send({ message: "Произошла ошибка на сервере" });
    });
};
