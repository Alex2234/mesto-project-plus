import { Request, Response } from "express";
import Card from "../models/card";
import { HTTP_STATUS_CODES, ERROR_MESSAGES } from "../utils/constants";

export const getCards = (req: Request, res: Response) => {
  return Card.find({})
    .then((cards) => res.status(HTTP_STATUS_CODES.OK).send({ data: cards }))
    .catch(() =>
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR })
    );
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const owner = res.locals.user._id;

  return Card.create({ name, link, owner })
    .then((card) => res.status(HTTP_STATUS_CODES.CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({
          message: ERROR_MESSAGES.VALIDATION_ERROR,
        });
      }
      return res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

export const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;

  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).send({
          message: ERROR_MESSAGES.CARD_NOT_FOUND,
        });
      }

      return card
        .remove()
        .then(() => res.send({ message: "Карточка удалена" }));
    })
    .catch(() =>
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR })
    );
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
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).send({
          message: ERROR_MESSAGES.CARD_NOT_FOUND,
        });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({
          message: ERROR_MESSAGES.VALIDATION_ERROR,
        });
      }
      return res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
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
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).send({
          message: ERROR_MESSAGES.CARD_NOT_FOUND,
        });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({
          message: ERROR_MESSAGES.VALIDATION_ERROR,
        });
      }
      return res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};
