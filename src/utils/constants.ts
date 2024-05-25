export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND_LOGIN: 401,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
};

export const ERROR_MESSAGES = {
  CARD_NOT_FOUND: "Карточка не найдена",
  USER_NOT_FOUND: "Пользователь не найден",
  VALIDATION_ERROR: "Переданы некорректные данные",
  EMAIL_OR_PASSWORD_NOT_FOUND: "Неправильные почта или пароль",
  EMAIL_OR_PASSWORD_ERROR: "Что-то не так с почтой или паролем",
  NECESSARY_AUTHORIZED: "Необходима авторизация",
  FORBIDDEN_CARD: "Можно удалять только свои карточки",
  ROUTE_NOT_FOUND: "Маршрут не найден",
};
