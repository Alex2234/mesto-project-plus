import { model, Schema, Types } from "mongoose";
import { validationUrl } from "../utils/validationUrl";

interface ICard {
  name: string;
  link: string;
  owner: Types.ObjectId;
  likes: Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema<ICard>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    link: {
      type: String,
      validate: {
        validator: validationUrl,
        message: "Неправильный формат URL карточки",
      },
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: {
      type: [{ type: Schema.Types.ObjectId, ref: "user" }],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

export default model<ICard>("card", cardSchema);
