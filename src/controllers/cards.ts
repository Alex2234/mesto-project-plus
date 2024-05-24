import { Request, Response, NextFunction } from "express";
import Card from "../models/card";
import { HTTP_STATUS_CODES, ERROR_MESSAGES } from "../utils/constants";
import { MeRequest } from "../types";

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
    .then((cards) => res.status(HTTP_STATUS_CODES.OK).send({ data: cards }))
    .catch(next);
};

export const createCard = (
  req: MeRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, link } = req.body;
  const owner = req.user?._id;

  return Card.create({ name, link, owner })
    .then((card) => res.status(HTTP_STATUS_CODES.CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({
          message: ERROR_MESSAGES.VALIDATION_ERROR,
        });
      }
      return next;
    });
};

export const deleteCard = (
  req: MeRequest,
  res: Response,
  next: NextFunction
) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return res.status(HTTP_STATUS_CODES.NOT_FOUND).send({
          message: ERROR_MESSAGES.CARD_NOT_FOUND,
        });
      } else if (card.owner.toString() !== userId) {
        res
          .status(HTTP_STATUS_CODES.FORBIDDEN)
          .send({ message: ERROR_MESSAGES.FORBIDDEN_CARD });
      }
      return card
        .remove()
        .then(() => res.send({ message: "Карточка удалена" }));
    })
    .catch(next);
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
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
      return next;
    });
};

export const dislikeCard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      return next;
    });
};
