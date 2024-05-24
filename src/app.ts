import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
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

const { PORT = 3000, MONGO_URL = "mongodb://127.0.0.1:27017/mestodb" } =
  process.env;

const app = express();

app.use(express.json());

mongoose.connect(MONGO_URL);

app.use(requestLogger);

app.post("/signin", validationLogin, login);
app.post("/signup", validationCreateUser, createUser);

app.use(auth);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorCenter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
