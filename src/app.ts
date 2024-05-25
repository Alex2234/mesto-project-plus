import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { config } from "../config";
import router from "./routes/index";
import { createUser, login } from "./controllers/users";
import auth from "./middlewares/auth";
import { requestLogger, errorLogger } from "./middlewares/logger";
import errorCenter from "./middlewares/errorCenter";
import {
  validationCreateUser,
  validationLogin,
} from "./middlewares/validation";
import { errors } from "celebrate";
import notFoundRoute from "./middlewares/notFoundRoute";

const app = express();

app.use(express.json());

mongoose.connect(config.mongoUrl);

app.use(requestLogger);

app.post("/signin", validationLogin, login);
app.post("/signup", validationCreateUser, createUser);

app.use(auth);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(notFoundRoute);
app.use(errorCenter);

app.listen(config.port, () => {
  console.log(`App listening on port ${config.port}`);
});
