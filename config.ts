import dotenv from "dotenv";

dotenv.config();

const { PORT = 3000, MONGO_URL = "mongodb://127.0.0.1:27017/mestodb" } =
  process.env;

export const config = {
  port: Number(PORT),
  mongoUrl: MONGO_URL,
};
