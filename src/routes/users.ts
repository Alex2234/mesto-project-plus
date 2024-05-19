import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserId,
  updateUser,
  updateAvatar,
} from "../controllers/users";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:userId", getUserId);
userRouter.post("/", createUser);
userRouter.patch("/me", updateUser);
userRouter.patch("/me/avatar", updateAvatar);

export default userRouter;
