import { Router } from "express";
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from "../controllers/cards";
import {
  validationCreateCard,
  validationCardId,
} from "../middlewares/validation";

const cardRouter = Router();

cardRouter.get("/", getCards);
cardRouter.post("/", validationCreateCard, createCard);
cardRouter.delete("/:cardId", validationCardId, deleteCard);
cardRouter.put("/:cardId/likes", validationCardId, likeCard);
cardRouter.delete("/:cardId/likes", validationCardId, dislikeCard);

export default cardRouter;
