import { Request, Response, NextFunction } from "express";
import Card from "../models/card";
import { HTTP_STATUS_CODES, ERROR_MESSAGES } from "../utils/constants";
import { MeRequest } from "../types";
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} from "../errors/customErrors";

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
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

  Card.create({ name, link, owner })
    .then((card) => res.status(HTTP_STATUS_CODES.CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(ERROR_MESSAGES.VALIDATION_ERROR));
      } else {
        next(err);
      }
    });
};

export const deleteCard = (
  req: MeRequest,
  res: Response,
  next: NextFunction
) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ERROR_MESSAGES.CARD_NOT_FOUND);
      }
      if (card.owner.toString() !== userId) {
        throw new ForbiddenError(ERROR_MESSAGES.FORBIDDEN_CARD);
      }
      return card
        .remove()
        .then(() => res.send({ message: "Карточка удалена" }));
    })
    .catch(next);
};

export const likeCard = (req: MeRequest, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ERROR_MESSAGES.CARD_NOT_FOUND);
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError(ERROR_MESSAGES.VALIDATION_ERROR));
      } else {
        next(err);
      }
    });
};

export const dislikeCard = (
  req: MeRequest,
  res: Response,
  next: NextFunction
) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ERROR_MESSAGES.CARD_NOT_FOUND);
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError(ERROR_MESSAGES.VALIDATION_ERROR));
      } else {
        next(err);
      }
    });
};
