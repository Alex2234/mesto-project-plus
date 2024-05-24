import { celebrate, Joi } from "celebrate";
import { validationUrl } from "../utils/validationUrl";

export const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string()
      .custom((value, helpers) => {
        if (!validationUrl(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      })
      .messages({
        "any.invalid": "Неправильный формат URL для аватара",
      }),
    email: Joi.string().required().email().message("Неправильный формат почты"),
    password: Joi.string().required(),
  }),
});

export const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().message("Неправильный формат почты"),
    password: Joi.string().required(),
  }),
});
