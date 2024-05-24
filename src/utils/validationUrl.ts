export const validationUrl = (url: string) => {
  return /^(https?:\/\/)(www\.)?([a-zA-Z0-9-._~:/?#[@\]!$&'()*+,;=]+)(#)?$/.test(
    url
  );
};
