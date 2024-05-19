import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/index";
import { Request, Response, NextFunction } from "express";

const { PORT = 3000, MONGO_URL = "mongodb://127.0.0.1:27017/mestodb" } = process.env;

const app = express();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.user = {
    _id: "66479be84516215b746ffa3f",
  };

  next();
});

app.use(router);

mongoose.connect(MONGO_URL);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
