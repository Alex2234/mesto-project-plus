import { Router } from "express";
import {
  getUsers,
  getUserId,
  updateUser,
  updateAvatar,
  getUserMe,
} from "../controllers/users";
import {
  validationGetUserId,
  validationUpdateUser,
  validationUpdateAvatar,
} from "../middlewares/validation";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/me", getUserMe);
userRouter.get("/:userId", validationGetUserId, getUserId);
userRouter.patch("/me", validationUpdateUser, updateUser);
userRouter.patch("/me/avatar", validationUpdateAvatar, updateAvatar);

export default userRouter;
