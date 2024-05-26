import { celebrate, Joi } from "celebrate";
import { validationUrl } from "../utils/validationUrl";

export const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": "Имя должно содержать не менее 2 символов",
      "string.max": "Имя должно содержать максимум 30 символов",
    }),
    about: Joi.string().min(2).max(200).messages({
      "string.min": "Описание должно содержать не менее 2 символов",
      "string.max": "Описание должно содержать максимум 30 символов",
    }),
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
    email: Joi.string().required().email().messages({
      "string.email": "Неправильный формат почты",
      "any.required": "Поле email обязательно для заполнения",
    }),
    password: Joi.string().required().messages({
      "any.required": "Поле password обязательно для заполнения",
    }),
  }),
});

export const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.email": "Неправильный формат почты",
      "any.required": "Поле email обязательно для заполнения",
    }),
    password: Joi.string().required().messages({
      "any.required": "Поле password обязательно для заполнения",
    }),
  }),
});

export const validationGetUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required().messages({
      "string.hex": "ID пользователя должно быть шестнадцатеричным",
      "string.length": "ID пользователя должно содержать 24 символа",
      "any.required": "ID пользователя обязательно для заполнения",
    }),
  }),
});

export const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": "Имя должно содержать не менее 2 символов",
      "string.max": "Имя должно содержать максимум 30 символов",
      "any.required": "Имя пользователя обязательно для заполнения",
    }),
    about: Joi.string().min(2).max(200).required().messages({
      "string.min": "Описание должно содержать не менее 2 символов",
      "string.max": "Описание должно содержать максимум 30 символов",
      "any.required": "Описание пользователя обязательно для заполнения",
    }),
  }),
});

export const validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!validationUrl(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      })
      .messages({
        "any.required": "Строка URL для аватара обязательна для заполнения",
        "any.invalid": "Неправильный формат URL для аватара",
      }),
  }),
});

export const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": "Имя должно содержать не менее 2 символов",
      "string.max": "Имя должно содержать максимум 30 символов",
      "string.required": "Поле должно быть заполнено",
    }),
    link: Joi.string()
      .custom((value, helpers) => {
        if (!validationUrl(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      })
      .messages({
        "any.invalid": "Неправильный формат URL для карточки",
      }),
  }),
});

export const validationCardId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required().messages({
      "string.hex": "ID карточки должно быть шестнадцатеричным",
      "string.length": "ID карточки должно содержать 24 символа",
      "any.required": "ID карточки обязательно для заполнения",
    }),
  }),
});
