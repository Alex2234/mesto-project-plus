import { model, Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { validationUrl } from "../utils/validationUrl";

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    validate: {
      validator: validationUrl,
      message: "Неправильный формат URL для аватара",
    },
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (v: string) => isEmail(v),
      message: "Неправильный формат почты",
    },
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export default model<IUser>("user", userSchema);
