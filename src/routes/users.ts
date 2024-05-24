import { Router } from "express";
import {
  getUsers,
  getUserId,
  updateUser,
  updateAvatar,
  getUserMe,
} from "../controllers/users";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/me", getUserMe);
userRouter.get("/:userId", getUserId);
userRouter.patch("/me", updateUser);
userRouter.patch("/me/avatar", updateAvatar);

export default userRouter;
